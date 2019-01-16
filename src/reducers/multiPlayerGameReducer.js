import {
  GET_GAMES, 
  SET_ACTIVE_GAME,
  UPDATE_GAMES
} from '../actions/types';

const initialState = {
  games: [],
  activeGame: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload.games
      };
      case SET_ACTIVE_GAME:
      return {
        ...state,
        activeGame: action.payload.activeGame
      };
    default:
      return state;
  }
}