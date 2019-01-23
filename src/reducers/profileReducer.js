import {
  GET_PROFILE,
  CREATE_PROFILE,
  CLEAR_CURRENT_PROFILE, 
  GET_STATS
} from '../actions/types';

const initialState = {
  profile: null,
  gameStats: []
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
        profile: action.payload
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_STATS:
    return {
      ...state,
      gameStats: action.payload
    };
    default:
      return state;
  }
}