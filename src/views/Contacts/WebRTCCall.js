import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Button,
  Dimensions,
  Text,
} from 'react-native';
import Draggable from 'react-native-draggable';
import InCallManager from 'react-native-incall-manager';
import {Container, Icon} from 'native-base';
import {connect} from 'react-redux';
import {getUserContacts} from '../../redux/actions/contactsAction';
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
import {socketService} from '../../service/socketIO';
const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};

function WebRTCCall(props) {
  const [info, setInfo] = useState('Initializing');
  const [status, setStatus] = useState('init');
  const [isFront, setIsFront] = useState(true);
  const [selfViewSrc, setSelfViewSrc] = useState(undefined);
  const [remoteList, setRemoteList] = useState({});
  const [localStream, setLocalStream] = useState(undefined);
  //const [socket, setSocket] = useState(undefined);
  const [textRoomConnected, setTextRoomConnected] = useState(false);
  const socket = socketService();
  useEffect(() => {
    console.log('----props in WebRTCCall------', props);
    (async () => {
      const localStreamTemp = await getLocalStream();
      setLocalStream(localStreamTemp);
      setSelfViewSrc(localStreamTemp.toURL());
    })();

    const socketTemp = socketService();
    //setSocket(socketTemp);
    setTimeout(async () => {
      const permission = await InCallManager.checkRecordPermission();
      console.log(permission);
      InCallManager.start({media: 'video'});
      //InCallManager.setForceSpeakerphoneOn(true);
    }, 500);
    socket.on('exchange', function(data) {
      exchange(data);
    });
    socket.on('leave', function(socketId) {
      leave(socketId);
    });
    socket.on('error', error => {
      console.log('socket error');
    });
    socket.on('connect_error', error => {
      console.log('socket connect error');
    });
    socket.on('connect', async function(data) {
      console.log('connect');
      setStatus('ready');
      setInfo('Please enter or create room ID');
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
  }, []);
  const pcPeers = {};
  const getLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(
      device => device.kind === 'videoinput' && device.facing === facing,
    );
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

    pc.onicecandidate = function(event) {
      //console.log('onicecandidate', event.candidate);
      if (event.candidate) {
        socket.emit('exchange', {to: socketId, candidate: event.candidate});
      }
    };

    async function createOffer() {
      console.log('---create offer function---');
      //console.log(pc);
      try {
        let offer = await pc.createOffer();
        console.log('---create offer done---');
        await pc.setLocalDescription(offer);
        console.log('---setLocalDescription done---');
        socket.emit('exchange', {to: socketId, sdp: pc.localDescription});
      } catch (error) {
        console.error(error);
      }
    }

    pc.onnegotiationneeded = function() {
      console.log('------onnegotiationneeded------');
      console.log(isOffer);
      if (isOffer) {
        console.log('---start to create offer');
        createOffer();
      }
    };

    pc.oniceconnectionstatechange = function(event) {
      console.log(
        'oniceconnectionstatechange',
        event.target.iceConnectionState,
      );
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

    pc.onaddstream = function(event) {
      //console.log('onaddstream', event.stream);
      setInfo('One peer join!');
      const remoteListTemp = remoteList;
      remoteListTemp[socketId] = event.stream.toURL();
      setRemoteList(remoteListTemp);
      console.log('-----remote list2------');
      //console.log(container.state.remoteList);
    };
    pc.onremovestream = function(event) {
      console.log('onremovestream', event.stream);
    };

    pc.addStream(localStream);
    function createDataChannel() {
      if (pc.textDataChannel) {
        return;
      }
      const dataChannel = pc.createDataChannel('text');

      dataChannel.onerror = function(error) {
        console.log('dataChannel.onerror', error);
      };

      dataChannel.onmessage = function(event) {
        //console.log('dataChannel.onmessage:', event.data);
        //container.receiveTextData({user: socketId, message: event.data});
      };

      dataChannel.onopen = function() {
        console.log('dataChannel.onopen');
        setTextRoomConnected(true);
      };

      dataChannel.onclose = function() {
        console.log('dataChannel.onclose');
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
      //console.log('exchange sdp', data);
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        if (pc.remoteDescription.type == 'offer') {
          let answer = await pc.createAnswer();
          //console.log('createAnswer done', answer);
          await pc.setLocalDescription(answer);
          //console.log('setRemoteDescription done', pc.localDescription);
          socket.emit('exchange', {to: fromId, sdp: pc.localDescription});
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //console.log('exchange candidate', data);
      pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }

  function leave(socketId) {
    console.log('leave', socketId);
    const pc = pcPeers[socketId];
    //const viewIndex = pc.viewIndex;
    pc.close();
    delete pcPeers[socketId];

    const remoteListTemp = remoteList;
    delete remoteListTemp[socketId];
    setRemoteList(remoteListTemp);
    setInfo('One peer leave!');
  }

  function logError(error) {
    console.log('logError', error);
  }

  function getStats() {
    const pc = pcPeers[Object.keys(pcPeers)[0]];
    if (
      pc.getRemoteStreams()[0] &&
      pc.getRemoteStreams()[0].getAudioTracks()[0]
    ) {
      const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
      //console.log('track', track);
      pc.getStats(
        track,
        function(report) {
          console.log('getStats report', report);
        },
        logError,
      );
    }
  }
  const _switchVideoType = () => {
    setIsFront(!isFront);
    const containertemp = this;
    console.log('printing this -----');
    console.log(this);
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  return (
    <View style={styles.container}>
      <RTCView
        objectFit="cover"
        streamURL={selfViewSrc}
        style={styles.selfView}
      />
      <View style={styles.reverseCameraView}>
        <Icon name="home" />
        <TouchableOpacity
            style={styles.reverseCameraButton}
            onPress={_switchVideoType}>
            <Text style={styles.reverseCameraText}>Switch Camera</Text>
          </TouchableOpacity>
      </View>
      <Draggable style={{position: 'absolute'}}>
        <RTCView
          streamURL={remoteList[Object.keys(remoteList)[0]]}
          style={styles.remoteView}
        />
      </Draggable>
    </View>
  );
}

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
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    left: '10%',
    right: '75%',
    bottom: 80,
    backgroundColor: 'transparent',
    borderRadius: 40,
    borderColor: '#388e3c',
    borderWidth: 3,
  },
  reverseCameraButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reverseCameraText: {
    textAlign: 'center',
  },
});

const mapStateToProps = ({userReducer, contactsReducer}) => {
  //console.log('----user in Tiles is-----', userReducer);
  const {contacts} = contactsReducer;
  return {contacts};
};

const mapDispatchToProps = {
  getUserContacts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebRTCCall);
