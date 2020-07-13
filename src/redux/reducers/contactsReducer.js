import {
  FETCHING_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILED,
} from '../type';
const initialState = {
  loading: false,
  contacts: [],
  err: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Login
    case FETCHING_CONTACTS: {
      return {...state, loading: true};
    }
    case FETCH_CONTACTS_SUCCESS: {
      const contacts = action.payload;
      console.log('-----contacts reducer----', {
        ...state,
        contacts,
        loading: false,
      });
      return {...state, contacts, loading: false};
    }
    case FETCH_CONTACTS_FAILED: {
      const {err} = action.payload;
      return {...state, err, loading: false};
    }
    // Default
    default: {
      return state;
    }
  }
};
