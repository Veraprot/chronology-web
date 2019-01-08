import axios from 'axios';

import {CREATE_TIMELINE, MOVE_CARD} from './types';
const baseUrl = 'http://localhost:3001/api/v1'

export const createTimeline = (startDate, endDate) => dispatch => {
  let body = JSON.stringify({ game: {startDate, endDate}})
  axios
    .post(
      `${baseUrl}/games/timeline`, 
      body,
      {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      dispatch({
        type: CREATE_TIMELINE,
        payload: {
          timeline: {
            startDate, 
            endDate
          },
          cards: res.data,
          activeCard: generateRandomCard(res.data),
          answeredCards: generateRandomCard(res.data)
        }
      })
    })
    .catch(err => {
      console.log(err)
    });
}

export const moveCard = (dragIndex, hoverIndex, dragItem, answeredCards, cardDeck) => dispatch => {
  dispatch({
    type: MOVE_CARD,
    payload: {
      activeCard: generateRandomCard(cardDeck),
      answeredCards: getDraggedCards(answeredCards, dragIndex, hoverIndex, dragItem)
    }
  })
}

const generateRandomCard = (cardStack) => {
  return cardStack[Math.floor(Math.random() * cardStack.length)]
}

const getDraggedCards = (newcards, dragIndex, hoverIndex, dragItem) => {
  newcards.splice(dragIndex, 1); // removing what you are dragging.
  newcards.splice(hoverIndex, 0, dragItem); // inserting it into hoverIndex.

  return newcards
}
