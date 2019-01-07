import {
  GET_PROFILE,
  CREATE_PROFILE,
  GET_ERRORS
} from '../actions/types';

const initialState = {
  username: null,
  profiles: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
      };
    case CREATE_PROFILE:
      return {
        ...state,
        username: action.payload
      }
    default:
      return state;
  }
}