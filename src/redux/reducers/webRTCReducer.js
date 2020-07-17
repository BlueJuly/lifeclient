import {
  UPDATING_WEBRTCREDUCER,
  UPDATE_WEBRTC_ISFRONT,
  UPDATE_WEBRTC_REMOTELIST,
  UPDATE_WEBRTC_SELFVIEWSRC,
  UPDATE_WEBRTC_LOCALSTREAM,
  UPDATE_WEBRTC_FAILED,
} from '../type';

const initialState = {
  updating: false,
  isFront: true,
  remoteList: {},
  selfViewSrc: undefined,
  localStream: undefined,
  err: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Login
    case UPDATING_WEBRTCREDUCER: {
      return {...state, updating: true};
    }
    case UPDATE_WEBRTC_ISFRONT: {
      const isFront = action.payload;
      console.log('-----webrtc reducer----', {
        ...state,
        isFront,
        loading: false,
      });
      return {...state, isFront, loading: false};
    }
    case UPDATE_WEBRTC_REMOTELIST: {
      const remoteList = action.payload;
      console.log('-----webrtc reducer----', {
        ...state,
        remoteList,
        loading: false,
      });
      return {...state, remoteList, loading: false};
    }
    case UPDATE_WEBRTC_SELFVIEWSRC: {
      const selfViewSrc = action.payload;
      console.log('-----webrtc reducer----', {
        ...state,
        selfViewSrc,
        loading: false,
      });
      return {...state, selfViewSrc, loading: false};
    }
    case UPDATE_WEBRTC_LOCALSTREAM: {
      const localStream = action.payload;
      console.log('-----webrtc reducer----', {
        ...state,
        localStream,
        loading: false,
      });
      return {...state, localStream, loading: false};
    }
    case UPDATE_WEBRTC_FAILED: {
      const {err} = action.payload;
      return {...state, err, loading: false};
    }
    // Default
    default: {
      return state;
    }
  }
};
