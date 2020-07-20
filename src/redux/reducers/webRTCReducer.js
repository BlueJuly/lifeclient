import {
  UPDATING_WEBRTCREDUCER,
  UPDATE_WEBRTC_ISFRONT,
  UPDATE_WEBRTC_REMOTELIST,
  UPDATE_WEBRTC_REMOTESOCKETID,
  UPDATE_WEBRTC_REMOTEVIEWSRC,
  UPDATE_WEBRTC_SELFVIEWSRC,
  UPDATE_WEBRTC_LOCALSTREAM,
  UPDATE_WEBRTC_CALLSTATUS,
  UPDATE_WEBRTC_FAILED,
  RESET_WEBRTCREDUCER,
} from '../type';

const initialState = {
  updating: false,
  isFront: true,
  remoteList: {},
  remoteSocketId: undefined,
  remoteViewSrc: undefined,
  selfViewSrc: undefined,
  localStream: undefined,
  callStatus: '',
  err: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Login
    case UPDATING_WEBRTCREDUCER: {
      return {...state, updating: true};
    }
    case RESET_WEBRTCREDUCER: {
      return initialState;
    }
    case UPDATE_WEBRTC_ISFRONT: {
      const isFront = action.payload;
      return {...state, isFront};
    }
    case UPDATE_WEBRTC_CALLSTATUS: {
      const callStatus = action.payload;
      return {...state, callStatus};
    }
    case UPDATE_WEBRTC_REMOTELIST: {
      const remoteList = action.payload;
      return {...state, remoteList};
    }
    case UPDATE_WEBRTC_REMOTESOCKETID: {
      const remoteSocketId = action.payload;
      return {...state, remoteSocketId};
    }
    case UPDATE_WEBRTC_REMOTEVIEWSRC: {
      const remoteViewSrc = action.payload;
      return {...state, remoteViewSrc};
    }
    case UPDATE_WEBRTC_SELFVIEWSRC: {
      const selfViewSrc = action.payload;
      return {...state, selfViewSrc};
    }
    case UPDATE_WEBRTC_LOCALSTREAM: {
      const localStream = action.payload;
      return {...state, localStream};
    }
    case UPDATE_WEBRTC_FAILED: {
      const {err} = action.payload;
      return {...state, err};
    }
    // Default
    default: {
      return state;
    }
  }
};
