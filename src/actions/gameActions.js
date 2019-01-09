import axios from 'axios';

import {CREATE_TIMELINE, MOVE_ANSWERED_CARD, ANSWER_CARD} from './types';
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

export const moveAnsweredCard = (dragIndex, hoverIndex, dragItem, answeredCards, cardDeck) => dispatch => {
  dispatch({
    type: MOVE_ANSWERED_CARD,
    payload: {
      gameView: true,
      activeCard: generateRandomCard(cardDeck),
      answeredCards: getDraggedCards(answeredCards, dragIndex, hoverIndex, dragItem)
    }
  })
}

export const answerCard = (activeCard, cardDeck) => 
dispatch => {
  dispatch({
    type: ANSWER_CARD,
    payload: {
      cards: cardDeck.filter(card => card.id !== activeCard.id),
      activeCard: generateRandomCard(cardDeck),
      answeredCards: activeCard
    }
  })
}

export const moveCard = (cards, answeredCards) => dispatch => {
  console.log('hi')
  dispatch({
    type: ANSWER_CARD, 
    payload: {
      cards,
      answeredCards
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
