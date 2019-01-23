import {
  GET_GAMES, 
  SET_GAME_CREATOR
} from '../actions/types';

const initialState = {
  games: [],
  gameCreator: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload.games
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