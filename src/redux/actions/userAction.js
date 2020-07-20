import {CommonActions} from '@react-navigation/native';
import {LOGIN, LOGINSUCCESS, LOGINFAILED, UPDATE_DEVICE_INFO} from '../type';
import {loginRequest, updateMobileDeviceInfoRequest} from '../api/apiRequest';
import {getMobileDeviceInfo} from '../../service/getDeviceInfo';
import {socketService} from '../../service/socketIO';
export const login = (username, password, navigation) => async (
  dispatch,
  getState,
) => {
  dispatch({type: LOGIN});
  try {
    //console.log('----getting into action----');
    let user = await loginRequest(username, password);
    //console.log('----this is user from action----', user);
    dispatch({type: LOGINSUCCESS, payload: user});
    navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: 'Homepage'}]}),
    );
  } catch (err) {
    //console.log('----error in action----', err);
    dispatch({type: LOGINFAILED, payload: {err: 'loged in failed'}});
  }
};

export const updateDeviceInfo = () => async (dispatch, getState) => {
  try {
    let {user} = getState().userReducer;
    //console.log('----this is user from update device info action 1----', user);
    const mobileDeviceInfo = await getMobileDeviceInfo();
    user.mobileDevice = user.mobileDevice
      ? {...user.mobileDevice, ...mobileDeviceInfo}
      : mobileDeviceInfo;
    user = await updateMobileDeviceInfoRequest(user);
    //console.log('----this is user from update device info action 2----', user);
    // const {authToken} = data;
    dispatch({type: UPDATE_DEVICE_INFO, payload: user});
  } catch (err) {
    //console.log('----error in user action updateDeviceInfo----', err);
  }
};

export const connectSocketIO = () => async (dispatch, getState) => {
  try {
    let {user} = getState().userReducer;
    //console.log('----this is user from action connectSocketIO 1----', user);
    let socket = socketService(user._id);
    socket.on('connect', async () => {
      const socketInfo = {socketId: socket.id, status: 'online'};
      user.mobileDevice = user.mobileDevice
        ? {...user.mobileDevice, ...socketInfo}
        : socketInfo;
      //console.log('----socket user ID ----', socket.id);
      user = await updateMobileDeviceInfoRequest(user);
      dispatch({type: UPDATE_DEVICE_INFO, payload: user});
    });
    if (socket.id) {
      user.mobileDevice = user.mobileDevice
        ? {...user.mobileDevice, ...{socketId: socket.id, status: 'online'}}
        : {socketId: socket.id, status: 'online'};
      //console.log('----socket user ID ----', socket.id);
      user = await updateMobileDeviceInfoRequest(user);
      dispatch({type: UPDATE_DEVICE_INFO, payload: user});
    }
    socket.on('disconnect', async () => {
      const socketInfo = {socketId: '', status: 'offline'};
      user.mobileDevice = user.mobileDevice
        ? {...user.mobileDevice, ...socketInfo}
        : socketInfo;
      user = await updateMobileDeviceInfoRequest(user);
      dispatch({type: UPDATE_DEVICE_INFO, payload: user});
    });
  } catch (err) {
    //console.log('----error in user action updateDeviceInfo----', err);
  }
};
