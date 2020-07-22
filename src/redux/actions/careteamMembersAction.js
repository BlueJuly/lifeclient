import {CommonActions} from '@react-navigation/native';
import {
  FETCHING_CARETEAMMEMBERS,
  FETCH_CARETEAMMEMBERS_SUCCESS,
  FETCH_CARETEAMMEMBERS_FAILED,
} from '../type';
import {getUserCareTeamMembersRequest} from '../api/apiRequest';
export const getUserCareteamMembers = () => async (dispatch, getState) => {
  dispatch({type: FETCHING_CARETEAMMEMBERS});
  try {
    let {user} = getState().userReducer;
    let careteamMembers = await getUserCareTeamMembersRequest(user);
    dispatch({
      type: FETCH_CARETEAMMEMBERS_SUCCESS,
      payload: careteamMembers,
    });
  } catch (err) {
    dispatch({
      type: FETCH_CARETEAMMEMBERS_FAILED,
      payload: {err: 'fetch careteam members failed'},
    });
  }
};
