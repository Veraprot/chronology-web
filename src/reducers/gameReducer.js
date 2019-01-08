import { CREATE_TIMELINE } from '../actions/types';

const initialState = {
  cards: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TIMELINE:
      return {
        ...state,
        cards: action.payload.cards,
      };
    default:
      return state;
  }
}
