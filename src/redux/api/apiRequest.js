const EndPoint = 'http://192.168.0.15:4040';
const LoginAPI = EndPoint + '/api/auth/login';
const UpdateUserInfoAPI = EndPoint + '/api/users/';
const GetUserTilesAPI = EndPoint + '/api/tiles/';
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
    //console.log('----this is res from update device info request2----', resJson);
    return resJson;
  } catch (error) {
    return error;
  }
};
export const getUserTilesRequest = async function(user) {
  try {
    let tiles = [];
    for (let index = 0; index < user.tiles.length; index++) {
      let res = await fetch(GetUserTilesAPI + '/' + user.tiles[index], {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      //console.log('----this is res from update device info request1----', user);
      let resJson = await res.json();
      tiles.push(resJson);
    }
    //console.log('----this is res from update device info request2----', resJson);
    return tiles;
  } catch (error) {
    return error;
  }
};
