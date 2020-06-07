import {LOGIN, LOGINSUCCESS, LOGINFAILED} from '../type';
const initialState = {
  loading: false,
  token: '',
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
      const {token, user} = action.payload;
      return {...state, token, user, loading: false};
    }
    case LOGINFAILED: {
      const {err} = action.payload;
      return {...state, err, loading: false};
    }
    // Default
    default: {
      return state;
    }
  }
};
