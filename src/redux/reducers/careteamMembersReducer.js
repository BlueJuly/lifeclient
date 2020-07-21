import {
  FETCHING_CARETEAMMEMBERS,
  FETCH_CARETEAMMEMBERS_SUCCESS,
  FETCH_CARETEAMMEMBERS_FAILED,
} from '../type';
const initialState = {
  loading: false,
  careteamMembers: [],
  err: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Login
    case FETCHING_CARETEAMMEMBERS: {
      return {...state, loading: true};
    }
    case FETCH_CARETEAMMEMBERS_SUCCESS: {
      const careteamMembers = action.payload;
      console.log('-----careteam members reducer----', {
        ...state,
        careteamMembers,
        loading: false,
      });
      return {...state, careteamMembers, loading: false};
    }
    case FETCH_CARETEAMMEMBERS_FAILED: {
      const {err} = action.payload;
      return {...state, err, loading: false};
    }
    // Default
    default: {
      return state;
    }
  }
};
