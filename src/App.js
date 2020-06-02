'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  FlatList,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import Draggable from 'react-native-draggable';
import io from 'socket.io-client';


import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
  mediaDevices,
} from 'react-native-webrtc';

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const pcPeers = {};
let localStream;
var container;

let socket;
const getLocalStream = async () => {
  // isFront will determine if the initial camera should face user or environment
  const isFront = true;
  const devices = await mediaDevices.enumerateDevices();

  const facing = isFront ? 'front' : 'environment';
  const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
  const facingMode = isFront ? 'user' : 'environment';
  const constraints = {
    audio: true,
    video: {
      mandatory: {
        minFrameRate: 30,
      },
      facingMode,
      optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
    },
  };
  const newStream = await mediaDevices.getUserMedia(constraints);
  return newStream;
};

function prepareCall() {
  socket.emit('prepareCall');
}

function createPC(socketId, isOffer) {
  console.log('----create PC---');
  const pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event.candidate);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  async function createOffer() {
    console.log('---create offer function---');
    console.log(pc);
    try {
      let offer = await pc.createOffer();
      console.log('---create offer done---');
      await pc.setLocalDescription(offer);
      console.log('---setLocalDescription done---');
      socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
    } catch (error) {
      console.error(error);
    }
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    console.log('------');
    console.log(isOffer);
    if (isOffer) {
      console.log('---start to create offer');
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    if (event.target.iceConnectionState === 'completed') {
      setTimeout(() => {
        getStats();
      }, 1000);
    }
    if (event.target.iceConnectionState === 'connected') {
      createDataChannel();
    }
  };
  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event.target.signalingState);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event.stream);
    container.setState({info: 'One peer join!'});

    const remoteList = container.state.remoteList;
    remoteList[socketId] = event.stream.toURL();
    container.setState({ remoteList: remoteList });
    console.log('-----remote list2------');
    console.log(container.state.remoteList);
  };
  pc.onremovestream = function (event) {
    console.log('onremovestream', event.stream);
  };

  pc.addStream(localStream);
  function createDataChannel() {
    if (pc.textDataChannel) {
      return;
    }
    const dataChannel = pc.createDataChannel("text");

    dataChannel.onerror = function (error) {
      console.log("dataChannel.onerror", error);
    };

    dataChannel.onmessage = function (event) {
      console.log("dataChannel.onmessage:", event.data);
      container.receiveTextData({user: socketId, message: event.data});
    };

    dataChannel.onopen = function () {
      console.log('dataChannel.onopen');
      container.setState({textRoomConnected: true});
    };

    dataChannel.onclose = function () {
      console.log("dataChannel.onclose");
    };

    pc.textDataChannel = dataChannel;
  }
  return pc;
}

async function exchange(data) {
  const fromId = data.from;
  let pc;
  if (fromId in pcPeers) {
    pc = pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
  }

  if (data.sdp) {
    console.log('exchange sdp', data);
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      if (pc.remoteDescription.type == 'offer') {
        let answer = await pc.createAnswer();
        console.log('createAnswer done', answer);
        await pc.setLocalDescription(answer);
        console.log('setRemoteDescription done', pc.localDescription);
        socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  const pc = pcPeers[socketId];
  //const viewIndex = pc.viewIndex;
  pc.close();
  delete pcPeers[socketId];

  const remoteList = container.state.remoteList;
  delete remoteList[socketId]
  container.setState({ remoteList: remoteList });
  container.setState({info: 'One peer leave!'});
}


function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

function getStats() {
  const pc = pcPeers[Object.keys(pcPeers)[0]];
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
    console.log('track', track);
    pc.getStats(track, function(report) {
      console.log('getStats report', report);
    }, logError);
  }
}


class RCTWebRTCDemo extends Component {
  constructor(props){
    console.log('get into constructor');
    super(props);
    this.state =  { 
      info: 'Initializing',
      status: 'init',
      roomID: '',
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
      textRoomConnected: false,
      textRoomData: [],
      textRoomValue: '',
    };
    container = this;
  }
  _loadInitialState = async()=>{
  }
  async componentDidMount(){
    console.log('get into did mount');
    console.log(this.props);
    
    this._loadInitialState().done();
    localStream = await getLocalStream();
    container.setState({selfViewSrc: localStream.toURL()});
    if (Platform.OS === 'android') {
      socket = io.connect('https://lifeserver.azurewebsites.net', {
        query: {device: 'android'},
        transports: ['websocket'],
      });
    }
    if (Platform.OS === 'ios') {
      socket = io.connect('https://lifeserver.azurewebsites.net', {
        query: {device: 'iOS'},
        transports: ['websocket'],
      });
    }
    socket.on('exchange', function(data){
      exchange(data);
    });
    socket.on('leave', function(socketId){
      leave(socketId);
    });
    socket.on('error', (error)=>{
      console.log('socket error')
    });
    socket.on('connect_error', (error)=>{
      console.log('socket connect error')
    })
   socket.on('connect', async function(data) {
        console.log('connect');
        container.setState({status: 'ready', info: 'Please enter or create room ID'});
        if (Platform.OS === 'ios') {
          prepareCall();
        }
        //prepareCall();
    });
    socket.on('startCall', function(receiverSocketId) {
      console.log('-----start call----');
      console.log('-----socket----');
      console.log(receiverSocketId);
      if (receiverSocketId) {
        createPC(receiverSocketId, true);
      }
    });
  }
  _press = (event) => {
    this.refs.roomID.blur();
    this.setState({status: 'connect', info: 'Connecting'});
    join(this.state.roomID);
  }
  _switchVideoType= ()=> {
    const isFront = !this.state.isFront;
    this.setState({isFront});
    const containertemp = this;
    console.log("printing this -----")
    console.log(this);
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  }
  receiveTextData=(data)=> {
    const textRoomData = this.state.textRoomData.slice();
    textRoomData.push(data);
    this.setState({textRoomData, textRoomValue: ''});
  }
  _textRoomPress=()=> {
    if (!this.state.textRoomValue) {
      return
    }
    const textRoomData = this.state.textRoomData.slice();
    textRoomData.push({user: 'Me', message: this.state.textRoomValue});
    for (const key in pcPeers) {
      const pc = pcPeers[key];
      pc.textDataChannel.send(this.state.textRoomValue);
    }
    this.setState({textRoomData, textRoomValue: ''});
  }

  renderRow({item}) {
    return <Text>{`${item.user}: ${item.message}`}</Text>;
}

  _renderTextRoom=()=> {
    return (
      <View style={styles.listViewContainer}>
        <FlatList
          dataSource={this.state.textRoomData}
          renderItem={this.renderRow}
          />
        <TextInput
          style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={value => this.setState({textRoomValue: value})}
          value={this.state.textRoomValue}
        />
        <TouchableHighlight
          onPress={this._textRoomPress}>
          <Text>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>

        <RTCView streamURL={this.state.selfViewSrc} style={styles.selfView} />
        <View style={styles.reverseCameraView}>
          <TouchableOpacity
            style={styles.reverseCameraButton}
            onPress={this._switchVideoType}>
            <Text>Switch Camera</Text>
          </TouchableOpacity>
        </View>
        <Draggable  style={{position:'absolute'}}>
          <RTCView  streamURL={this.state.remoteList[Object.keys(this.state.remoteList)[0]]} style={styles.remoteView}/>
        </Draggable>

        {/* <Text style={styles.welcome}>
          {this.state.info}
        </Text>
        {this.state.textRoomConnected && this._renderTextRoom()}
        <View style={{flexDirection: 'row'}}>
          <Text>
            {this.state.isFront ? "Use front camera" : "Use back camera"}
          </Text>
          <TouchableHighlight
            style={{borderWidth: 1, borderColor: 'black'}}
            onPress={this._switchVideoType}>
            <Text>Switch camera</Text>
          </TouchableHighlight>
        </View> */}
        {/* { this.state.status == 'ready' ?
          (<View>
            <TextInput
              ref='roomID'
              autoCorrect={false}
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({roomID: text})}
              value={this.state.roomID}
            />
            <TouchableHighlight
              onPress={this._press}>
              <Text>Enter room</Text>
            </TouchableHighlight>
          </View>) : null
        }
        
        {
          mapHash(this.state.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
          })
        } */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  selfView: {
    flex: 1,
  },
  remoteView: {
    width: 200,
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listViewContainer: {
    height: 150,
  },
  reverseCameraView: {
    position:'absolute',
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height:80,
    left: '10%',
    right:'75%',
    bottom: 80,
    backgroundColor: 'transparent',
    borderRadius:40,
    borderColor:'#388e3c',
    borderWidth: 3
  },
  reverseCameraButton:{
  },
});
export default RCTWebRTCDemo;
