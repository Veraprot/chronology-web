import axios from 'axios';

import {CREATE_TIMELINE, REGISTER_MOVE, UPDATE_ACTIVE_CARD, ANSWER_CARD, END_GAME} from './types';
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
          gameView: true,
          gameStatus: 'in progress',
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

export const registerUserMove = (moves) => dispatch => {
  dispatch({
    type: REGISTER_MOVE, 
    payload: {
      moves: moves + 1
    }
  })
}

export const moveCard = ( answeredCards) => dispatch => {
  dispatch({
    type: ANSWER_CARD, 
    payload: {
      answeredCards
    }
  })
}

export const updateCard = (cardDeck) => dispatch => {
  dispatch({
    type: UPDATE_ACTIVE_CARD, 
    payload: {
      activeCard: [generateRandomCard(cardDeck)],
    }
  })
}

export const endGame = (moves, timelineLimit) => dispatch => {
  dispatch({
    type: END_GAME, 
    payload: {
      gameStatus: 'ended',
      score: calculateUserScore(moves, timelineLimit)
    }
  })
}

const generateRandomCard = (cardStack) => {
  return cardStack[Math.floor(Math.random() * cardStack.length)]
}

const calculateUserScore = (moves, timelineLimit) => {
  return Math.ceil(moves/timelineLimit * 100)
}
