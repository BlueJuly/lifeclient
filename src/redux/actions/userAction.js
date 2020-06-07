import {LOGIN, LOGINSUCCESS, LOGINFAILED} from '../type';
export const login = (username, password) => async (dispatch, getState) => {
  dispatch({type: LOGIN});
  try {
    const user = await fetch('https://lifeserver.azurewebsites.net/');
    const data = await user.json();
    console.log('this is user from action', data);
    const {authToken} = data;
    dispatch({type: LOGINSUCCESS, payload: {token: authToken, user: data}});
  } catch (err) {
    dispatch({type: LOGINFAILED, payload: {err: 'loged in failed'}});
  }
};
