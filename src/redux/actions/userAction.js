import {CommonActions} from '@react-navigation/native';
import {LOGIN, LOGINSUCCESS, LOGINFAILED} from '../type';
const LoginAPI = 'http://192.168.0.14:4040/api/auth/login';
export const login = (username, password, navigation) => async (dispatch, getState) => {
  dispatch({type: LOGIN});
  try {
    console.log('----getting into action----');
    let res = await fetch(LoginAPI, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log('----this is res from action----', res);
    let user = await res.json();
    // const user = await fetch('https://lifeserver.azurewebsites.net/');
    // const data = await user.json();
    console.log('----this is user from action----', user);
    // const {authToken} = data;
    dispatch({type: LOGINSUCCESS, payload: user});
    navigation.dispatch(CommonActions.navigate({name: 'Homepage'}));
  } catch (err) {
    console.log('----error in action----', err);
    dispatch({type: LOGINFAILED, payload: {err: 'loged in failed'}});
  }
};
