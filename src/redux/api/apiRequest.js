const LoginAPI = 'http://192.168.0.21:4040/api/auth/login';
const UpdateUserInfoAPI = 'http://192.168.0.21:4040/api/users';
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
    console.log('----this is login request----', res);
    let user = await res.json();
    return user;
  } catch (error) {
    return error;
  }
};

export const updateMobileDeviceInfoRequest = async function(user) {
  try {
    let res = await fetch(UpdateUserInfoAPI, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    //console.log('----this is res from update device info request1----', user);
    let resJson = await res.json();
    console.log('----this is res from update device info request2----', resJson);
    return user;
  } catch (error) {
    return error;
  }
};
