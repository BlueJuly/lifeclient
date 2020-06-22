import {CommonActions} from '@react-navigation/native';
import {LOGIN, LOGINSUCCESS, LOGINFAILED, UPDATE_DEVICE_INFO} from '../type';
import {loginRequest} from '../api/apiRequest';
const LoginAPI = 'http://192.168.0.14:4040/api/auth/login';
export const login = (username, password, navigation) => async (
  dispatch,
  getState,
) => {
  dispatch({type: LOGIN});
  try {
    console.log('----getting into action----');
    // let res = await fetch(LoginAPI, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // });
    // console.log('----this is res from action----', res);
    let user = await loginRequest();
    console.log('----this is user from action----', user);
    dispatch({type: LOGINSUCCESS, payload: user});
    navigation.dispatch(CommonActions.navigate({name: 'Homepage'}));
  } catch (err) {
    console.log('----error in action----', err);
    dispatch({type: LOGINFAILED, payload: {err: 'loged in failed'}});
  }
};
export const updateDeviceInfo = () => async (dispatch, getState) => {
  try {
    console.log('----getting into action----');
    const user = await fetch('https://lifeserver.azurewebsites.net/');
    console.log('----this is user from action----', user);
    // const {authToken} = data;
    dispatch({type: UPDATE_DEVICE_INFO, payload: user});
  } catch (err) {
    console.log('----error in action----', err);
    dispatch({type: LOGINFAILED, payload: {err: 'loged in failed'}});
  }
};
