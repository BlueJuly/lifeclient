import {CommonActions} from '@react-navigation/native';
import {
  FETCHING_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILED,
} from '../type';
import {getUserContactsRequest} from '../api/apiRequest';
export const getUserContacts = () => async (dispatch, getState) => {
  dispatch({type: FETCHING_CONTACTS});
  try {
    let {user} = getState().userReducer;
    console.log('----getting into contacts action----');
    let tiles = await getUserContactsRequest(user);
    console.log('----this is contacts  from action----', tiles);
    dispatch({type: FETCH_CONTACTS_SUCCESS, payload: tiles});
  } catch (err) {
    console.log('----error in contacts action----', err);
    dispatch({
      type: FETCH_CONTACTS_FAILED,
      payload: {err: 'fetch contacts failed'},
    });
  }
};
