import { CREATE_TIMELINE, ANSWER_CARD, UPDATE_ACTIVE_CARD, REGISTER_MOVE, END_GAME } from '../actions/types';

const initialState = {
  gameView: false,
  gameStatus: 'inactive',
  score: 0,
  moves: 0,
  timelineLimit: 10,
  cards: [],
  activeCard: [],
  answeredCards: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TIMELINE:
      console.log(action.payload.activeGame)
      return {
        ...state,
        activeGame: action.payload.activeGame,
        gameView: action.payload.gameView,
        gameStatus: action.payload.gameStatus,
        cards: action.payload.cards,
        activeCard: action.payload.activeCard,
        answeredCards: [action.payload.answeredCards]
      };
      
      case ANSWER_CARD:
        return {
          ...state,
          answeredCards: action.payload.answeredCards
        };
      case UPDATE_ACTIVE_CARD:
        return {
          ...state,
          activeCard: action.payload.activeCard
        };
      case REGISTER_MOVE:
      return {
        ...state,
        moves: action.payload.moves
      };
      case END_GAME:
      return {
        ...state,
        activeGame: action.payload.activeGame,
        gameStatus: action.payload.gameStatus,
        score: action.payload.score
      };
    default:
      return state;
  }
}


