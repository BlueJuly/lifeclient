import {combineReducers} from 'redux';
import userReducer from './userReducer.js';
import tilesReducer from './tilesReducer';
import contactsReducer from './contactsReducer';
import careteamMembersReducer from './careteamMembersReducer';
import webRTCReducer from './webRTCReducer';
export default combineReducers({
  userReducer: userReducer,
  tilesReducer: tilesReducer,
  contactsReducer: contactsReducer,
  webRTCReducer: webRTCReducer,
  careteamMembersReducer: careteamMembersReducer,
});
