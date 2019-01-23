import {
  SET_ACTIVE_GAME
} from '../actions/types';

const initialState = {
  game: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
      case SET_ACTIVE_GAME:
      console.log(action.payload.game)
      return {
        ...state,
        game: action.payload.game
      };

    default:
      return state;
  }
}