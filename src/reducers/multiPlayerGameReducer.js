import {
  GET_GAMES, 
  SET_ACTIVE_GAME,
  SET_GAME_CREATOR
} from '../actions/types';

const initialState = {
  games: [],
  activeGame: null,
  gameCreator: null
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
      case SET_GAME_CREATOR:
      return {
        ...state,
        gameCreator: action.payload.gameCreator
      };
    default:
      return state;
  }
}