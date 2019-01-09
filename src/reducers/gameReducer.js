import { CREATE_TIMELINE, MOVE_ANSWERED_CARD, ANSWER_CARD } from '../actions/types';

const initialState = {
  gameView: false,
  cards: [],
  activeCard: null,
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
      case MOVE_ANSWERED_CARD:
      return {
        ...state,
        activeCard: action.payload.activeCard,
        answeredCards: action.payload.answeredCards
      };
      case ANSWER_CARD:
      return {
        ...state,
        cards: action.payload.cards,
        activeCard: action.payload.activeCard,
        answeredCards: [...state.answeredCards, action.payload.answeredCards]
      };
    default:
      return state;
  }
}


