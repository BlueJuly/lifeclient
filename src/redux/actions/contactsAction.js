import {CommonActions} from '@react-navigation/native';
import {
  FETCHING_CARETEAMMEMBERS,
  FETCH_CARETEAMMEMBERS_SUCCESS,
  FETCH_CARETEAMMEMBERS_FAILED,
} from '../type';
import {getUserCareTeamMembersRequest} from '../api/apiRequest';
export const getUserContacts = () => async (dispatch, getState) => {
  dispatch({type: FETCHING_CARETEAMMEMBERS});
  try {
    let {user} = getState().userReducer;
    let contacts = await getUserCareTeamMembersRequest(user);
    console.log('----this is contacts  from action----', contacts);
    dispatch({type: FETCH_CARETEAMMEMBERS_SUCCESS, payload: contacts});
  } catch (err) {
    console.log('----error in contacts action----', err);
    dispatch({
      type: FETCH_CARETEAMMEMBERS_FAILED,
      payload: {err: 'fetch contacts failed'},
    });
  }
};
