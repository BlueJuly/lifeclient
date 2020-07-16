const EndPoint = 'http://192.168.0.12:4040';
const LoginAPI = EndPoint + '/api/auth/login';
const UpdateUserInfoAPI = EndPoint + '/api/users/';
const GetUserTilesAPI = EndPoint + '/api/users/';
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
    let user = await res.json();
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateMobileDeviceInfoRequest = async function(user) {
  try {
    let res = await fetch(UpdateUserInfoAPI + user._id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({mobileDevice: user.mobileDevice}),
    });
    //console.log('----this is res from update device info request1----', user);
    let resJson = await res.json();
    //console.log('----this is res from update device info request2----', resJson);
    return resJson;
  } catch (error) {
    throw error;
  }
};
export const getUserTilesRequest = async function(user) {
  try {
    let res = await fetch(GetUserTilesAPI + user._id + '/tiles', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    //console.log('----this is res from update device info request1----', user);
    const tiles = await res.json();

    //console.log('----this is res from update device info request2----', resJson);
    return tiles;
  } catch (error) {
    throw error;
  }
};

export const getUserContactsRequest = async function(user) {
  try {
    let res = await fetch(GetUserTilesAPI + user._id + '/contacts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    //console.log('----this is res from update device info request1----', user);
    const contacts = await res.json();
    return contacts;
  } catch (error) {
    throw error;
  }
};
