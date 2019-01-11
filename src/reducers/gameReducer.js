import { CREATE_TIMELINE, ANSWER_CARD, UPDATE_ACTIVE_CARD, END_GAME } from '../actions/types';

const initialState = {
  gameView: false,
  gameStatus: 'inactive',
  score: 0,
  moves: 0,
  timelineLimit: 2,
  cards: [],
  activeCard: [],
  answeredCards: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TIMELINE:
      return {
        ...state,
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
      case END_GAME:
      return {
        ...state,
        gameStatus: action.payload.gameStatus
      };
    default:
      return state;
  }
}


