import {combineReducers} from 'redux';
import userReducer from './userReducer.js';
import tilesReducer from './tilesReducer';
export default combineReducers({
  userReducer: userReducer,
  tilesReducer: tilesReducer,
});
