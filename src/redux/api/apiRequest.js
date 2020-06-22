const LoginAPI = 'http://192.168.0.21:4040/api/auth/login';

export const loginRequest = async function(username, password) {
  try {
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
    return user;
  } catch (error) {
    return error;
  }
};
