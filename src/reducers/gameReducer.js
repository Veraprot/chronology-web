import { CREATE_TIMELINE, MOVE_CARD } from '../actions/types';

const initialState = {
  cards: [
    {
      id: 24, date: "19500312", event: " A plane carrying returning rugby fans from Irelan… crashes near Llandow, with the loss of 80 lives.", created_at: "2019-01-08T19:29:50.476Z", updated_at: "2019-01-08T19:29:50.476Z"
    },
    {
      id: 25, date: "19500314", event: " The ship ''Cygnet'' hits a mine off the Dutch coast.", created_at: "2019-01-08T19:29:50.502Z", updated_at: "2019-01-08T19:29:50.502Z"
    },
    {
      id: 26, date: "19500317", event: " University of California, Berkeley researchers an…nt 98, which they have named quotcaliforniumquot.", created_at: "2019-01-08T19:29:50.506Z", updated_at: "2019-01-08T19:29:50.506Z"
    },
    {id: 27, date: "19500318", event: " The Belgian government collapses as a referendum …as Belgians vote for king | date=March 18, 1950}}", created_at: "2019-01-08T19:29:50.510Z", updated_at: "2019-01-08T19:29:50.510Z"
    },
    {
      id: 28, date: "19500320", event: " The Polish government decides to confiscate the property of the Polish Catholic Church.", created_at: "2019-01-08T19:29:50.518Z", updated_at: "2019-01-08T19:29:50.518Z"
    }
  ],
  activeCard: null,
  answeredCards: [
    {
      id: 29, date: "19500318", event: " The Belgian government collapses as a referendum …as Belgians vote for king | date=March 18, 1950}}", created_at: "2019-01-08T19:29:50.510Z", updated_at: "2019-01-08T19:29:50.510Z"
    },
    {
      id: 30, date: "19500320", event: " The Polish government decides to confiscate the property of the Polish Catholic Church.", created_at: "2019-01-08T19:29:50.518Z", updated_at: "2019-01-08T19:29:50.518Z"
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TIMELINE:
      return {
        ...state,
        cards: action.payload.cards,
        activeCard: action.payload.activeCard,
        answeredCards: action.payload.answeredCards
      };
      case MOVE_CARD:
      return {
        ...state,
        activeCard: action.payload.activeCard,
        answeredCards: action.payload.answeredCards
      };
    default:
      return state;
  }
}


