import {CommonActions} from '@react-navigation/native';
import {FETCHING_TILES, FETCH_TILES_SUCCESS, FETCH_TILES_FAILED} from '../type';
import {getUserTilesRequest} from '../api/apiRequest';
export const getUserTiles = () => async (dispatch, getState) => {
  dispatch({type: FETCHING_TILES});
  try {
    let {user} = getState().userReducer;
     //console.log('----getting into tiles action----');
    let tiles = await getUserTilesRequest(user);
      //console.log('----this is tiles  from action----', tiles);
    dispatch({type: FETCH_TILES_SUCCESS, payload: tiles});
  } catch (err) {
    //console.log('----error in tiles action----', err);
    dispatch({type: FETCH_TILES_FAILED, payload: {err: 'fetch tiles failed'}});
  }
};
