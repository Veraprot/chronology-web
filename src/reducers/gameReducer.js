import { CREATE_TIMELINE, MOVE_ANSWERED_CARD, ANSWER_CARD, UPDATE_ACTIVE_CARD } from '../actions/types';

const initialState = {
  gameView: false,
  cards: [],
  activeCard: [],
  answeredCards: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TIMELINE:
      return {
        ...state,
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
    default:
      return state;
  }
}


