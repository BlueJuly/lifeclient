import {LOGIN, LOGINSUCCESS, LOGINFAILED, UPDATE_DEVICE_INFO} from '../type';
const initialState = {
  loading: false,
  user: {},
  err: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Login
    case LOGIN: {
      return {...state, loading: true};
    }
    case LOGINSUCCESS: {
      const user = action.payload;
      console.log('-----user reducer----', {...state, user, loading: false});
      return {...state, user, loading: false};
    }
    case LOGINFAILED: {
      const {err} = action.payload;
      return {...state, err, loading: false};
    }
    case UPDATE_DEVICE_INFO: {
      const user = action.payload;
      return {...state, user, loading: false};
    }
    // Default
    default: {
      return state;
    }
  }
};
