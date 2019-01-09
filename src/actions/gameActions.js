import axios from 'axios';

import {CREATE_TIMELINE, UPDATE_ACTIVE_CARD, ANSWER_CARD} from './types';
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
          activeCard: [generateRandomCard(res.data)],
          answeredCards: generateRandomCard(res.data)
        }
      })
    })
    .catch(err => {
      console.log(err)
    });
}

export const moveCard = ( answeredCards) => dispatch => {
  console.log('hi')
  dispatch({
    type: ANSWER_CARD, 
    payload: {
      answeredCards
    }
  })
}

export const updateCard = ( cardDeck) => dispatch => {
  console.log('hi')
  dispatch({
    type: UPDATE_ACTIVE_CARD, 
    payload: {
      activeCard: [generateRandomCard(cardDeck)],
    }
  })
}

const generateRandomCard = (cardStack) => {
  return cardStack[Math.floor(Math.random() * cardStack.length)]
}

const getDraggedCards = (newcards, dragIndex, hoverIndex, dragItem) => {
  newcards.splice(dragIndex, 1);
  newcards.splice(hoverIndex, 0, dragItem); 
  return newcards
}
