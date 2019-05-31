import axios from 'axios';
import { API_ROOT } from '../constants';

import {CREATE_TIMELINE, REGISTER_MOVE, UPDATE_ACTIVE_CARD, ANSWER_CARD, END_GAME} from './types';

export const createTimeline = (startDate, endDate, history) => dispatch => {
  let body = JSON.stringify({ game: {start_date: startDate, end_date: endDate}})
  axios
    .post(`${API_ROOT}/games`, body)
    .then(res => {
      dispatch({
        type: CREATE_TIMELINE,
        payload: {
          timeline: {
            startDate, 
            endDate
          },
          activeGame: res.data,
          gameView: true,
          gameStatus: 'in progress',
          cards: res.data.cards,
          activeCard: [generateRandomCard(res.data.cards)],
          answeredCards: generateRandomCard(res.data.cards)
        }
      })
      history.push('/game')
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

export const endGame = (moves, timelineLimit, game) => dispatch => {
  let score = calculateUserScore(moves + 1, timelineLimit)
  let body = JSON.stringify({participant: {num_of_answers: timelineLimit, num_of_moves: moves, game_id: game.id, score: score}})
  axios
    .patch(
      `${API_ROOT}/participants/${game.participants[0].id}`,
      body
      )
    .then(() => {
      dispatch({
        type: END_GAME, 
        payload: {
          moves: moves + 1,
          activeGame: [],
          gameStatus: 'ended', 
          score
        }
      })
    })
}

const generateRandomCard = (cardStack) => {
  return cardStack[Math.floor(Math.random() * cardStack.length)]
}

const calculateUserScore = (moves, timelineLimit) => {
  return Math.ceil(timelineLimit/moves * 100)
}
