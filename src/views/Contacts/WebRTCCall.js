import React, {useState, useEffect} from 'react';
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
import {store} from '../../redux/store/store';
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
import {
  UPDATING_WEBRTCREDUCER,
  UPDATE_WEBRTC_ISFRONT,
  UPDATE_WEBRTC_REMOTELIST,
  UPDATE_WEBRTC_SELFVIEWSRC,
  UPDATE_WEBRTC_LOCALSTREAM,
  UPDATE_WEBRTC_FAILED,
  UPDATE_WEBRTC_CALLSTATUS,
  RESET_WEBRTCREDUCER,
} from '../../redux/type';
import {socketService} from '../../service/socketIO';
import userReducer from '../../redux/reducers/userReducer';
const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const socket = socketService(store.getState().userReducer.user._id);
let pcPeers = {socketId: undefined, pc: undefined};

socket.on('exchange', function(data) {
  console.log('---exchange---', data);
  exchange(data);
});
socket.on('leave', function(socketId) {
  leave(socketId);
});
socket.on('error', error => {
  console.log('socket error');
});
socket.on('connect_error', error => {
  console.log('socket connect error', error);
});
socket.on('startCall', function(receiverSocketId) {
  console.log('-----start call----');
  console.log(receiverSocketId);
  if (receiverSocketId) {
    createPC(receiverSocketId, true);
  }
});
function updateSelfViewSrc(selfViewSrc) {
  store.dispatch({type: UPDATE_WEBRTC_SELFVIEWSRC, payload: selfViewSrc});
}
function updateIsFront(isFront) {
  console.log('++++isFront in updateISFront+++++', store.getState());
  store.dispatch({type: UPDATE_WEBRTC_ISFRONT, payload: isFront});
}
function updateRemoteList(remoteList) {
  store.dispatch({type: UPDATE_WEBRTC_REMOTELIST, payload: remoteList});
}
function updateLocalStream(localStream) {
  store.dispatch({type: UPDATE_WEBRTC_LOCALSTREAM, payload: localStream});
}
function updateCallStatusConnected() {
  store.dispatch({type: UPDATE_WEBRTC_CALLSTATUS, payload: 'connected'});
}
function resetWebRTCReducer() {
  store.dispatch({type: RESET_WEBRTCREDUCER});
}

const getLocalStream = async () => {
  // isFront will determine if the initial camera should face user or environment
  const devices = await mediaDevices.enumerateDevices();
  const isFront = store.getState().webRTCReducer.isFront;
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

function createPC(socketId, isOffer) {
  console.log('----create PC socketId---', socketId);
  console.log('-----pcPeers in createPC 1------', pcPeers);
  const pc = new RTCPeerConnection(configuration);
  const localStream = store.getState().webRTCReducer.localStream;
  pcPeers.socketId = socketId;
  pcPeers.pc = pc;
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

  pc.onaddstream = function(event) {
    //console.log('onaddstream', event.stream);
    let remoteList = store.getState().webRTCReducer.remoteList;
    remoteList[socketId] = event.stream.toURL();
    console.log('-----remoteList in onaddstream------', remoteList);
    updateRemoteList(remoteList);
    updateCallStatusConnected();
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
    };

    dataChannel.onopen = function() {
      console.log('dataChannel.onopen');
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
  if (pcPeers.socketId === fromId) {
    pc = pcPeers.pc;
  } else {
    pc = createPC(fromId, false);
  }

  if (data.sdp) {
    //console.log('exchange sdp', data);
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      if (pc.remoteDescription.type === 'offer') {
        let answer = await pc.createAnswer();
        console.log('createAnswer done', answer);
        await pc.setLocalDescription(answer);
        console.log('setRemoteDescription done', pc.localDescription);
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
  if (pcPeers.socketId === socketId && pcPeers.pc) {
    const pc = pcPeers.pc;
    pc.close();
    //pcPeers = {};
  }
  const remoteList = store.getState().webRTCReducer.remoteList;
  delete remoteList[socketId];
  updateRemoteList(remoteList);
  //setInfo('One peer leave!');
}

function logError(error) {
  console.log('logError', error);
}

function getStats() {
  const pc = pcPeers.pc;
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

function WebRTCCall(props) {
  const contact = props.route.params;
  const {
    user,
    isFront,
    remoteList,
    localStream,
    selfViewSrc,
    callStatus,
    navigation,
  } = props;
  useEffect(() => {
    console.log('----props in WebRTCCall 2------', props);
    (async () => {
      const localStreamTemp = await getLocalStream();
      updateLocalStream(localStreamTemp);
      //setLocalStream(localStream);
      updateSelfViewSrc(localStreamTemp.toURL());
    })();
    setTimeout(async () => {
      const permission = await InCallManager.checkRecordPermission();
      console.log(permission);
      //InCallManager.start({media: 'video'});
      //InCallManager.setForceSpeakerphoneOn(true);
    }, 500);
  }, []);
  function endCall() {
    resetWebRTCReducer();
    if (pcPeers.pc) {
      const pc = pcPeers.pc;
      pc.close();
      pcPeers = {socketId: undefined, pc: undefined};
    }
    navigation.navigate('Contacts');
  }
  function prepareCall() {
    console.log('-----local stream in prepareCall------', localStream);
    if (contact.mobileDevice && contact.mobileDevice.socketId) {
      console.log('~~~~preparing call');
      socket.emit('prepareCall', {socketId: contact.mobileDevice.socketId});
    }
  }
  const _switchVideoType = () => {
    updateIsFront(!isFront);
    console.log('printing this -----', localStream);
    console.log('current socket ID is -----', socket.id);
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
      <View style={styles.endCallView}>
        {/* <Icon name="home" /> */}
        <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
          <Text style={styles.endCallText}>End</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.startCallView}>
        {/* <Icon name="home" /> */}
        <TouchableOpacity style={styles.startCallButton} onPress={prepareCall}>
          <Text style={styles.startCallText}>Start</Text>
        </TouchableOpacity>
      </View>
      <Draggable x={200} y={300} style={{position: 'absolute'}}>
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
  startCallView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    left: '75%',
    right: '10%',
    bottom: 80,
    backgroundColor: 'transparent',
    borderRadius: 40,
    borderColor: '#388e3c',
    borderWidth: 3,
  },
  startCallButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startCallText: {
    textAlign: 'center',
  },
  endCallView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    left: '40%',
    right: '50%',
    bottom: 80,
    backgroundColor: 'transparent',
    borderRadius: 40,
    borderColor: '#388e3c',
    borderWidth: 3,
  },
  endCallButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallText: {
    textAlign: 'center',
  },
});

const mapStateToProps = ({userReducer, contactsReducer, webRTCReducer}) => {
  const {contacts} = contactsReducer;
  const {user} = userReducer;
  const {
    isFront,
    remoteList,
    selfViewSrc,
    localStream,
    callStatus,
  } = webRTCReducer;
  return {
    contacts,
    user,
    isFront,
    remoteList,
    selfViewSrc,
    localStream,
    callStatus,
  };
};

const mapDispatchToProps = {
  getUserContacts,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebRTCCall);
