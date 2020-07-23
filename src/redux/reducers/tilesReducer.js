import {FETCHING_TILES, FETCH_TILES_SUCCESS, FETCH_TILES_FAILED} from '../type';
const initialState = {
  loading: false,
  tiles: [],
  err: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Login
    case FETCHING_TILES: {
      return {...state, loading: true};
    }
    case FETCH_TILES_SUCCESS: {
      const tiles = action.payload;
      return {...state, tiles, loading: false};
    }
    case FETCH_TILES_FAILED: {
      const {err} = action.payload;
      return {...state, err, loading: false};
    }
    // Default
    default: {
      return state;
    }
  }
};
