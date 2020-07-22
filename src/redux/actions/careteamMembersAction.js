import {CommonActions} from '@react-navigation/native';
import {
  FETCHING_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILED,
} from '../type';
import {getUserContactsRequest} from '../api/apiRequest';
export const getUserCareteamMembers = () => async (dispatch, getState) => {
  dispatch({type: FETCHING_CONTACTS});
  try {
    let {user} = getState().userReducer;
    let contacts = await getUserContactsRequest(user);
    console.log('----this is contacts  from action----', contacts);
    dispatch({type: FETCH_CONTACTS_SUCCESS, payload: contacts});
  } catch (err) {
    console.log('----error in contacts action----', err);
    dispatch({
      type: FETCH_CONTACTS_FAILED,
      payload: {err: 'fetch contacts failed'},
    });
  }
};
