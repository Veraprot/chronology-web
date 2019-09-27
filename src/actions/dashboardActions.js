import axios from 'axios';
import { API_ROOT } from '../constants';
import {GET_GAMES, SET_GAME_CREATOR} from './types';

export const getGames = () => dispatch => {
  axios
    .get(`${API_ROOT}/games`)
    .then(res => {
      dispatch({
        type: GET_GAMES,
        payload: {
          games: res.data
        }
      })
    })
    .catch(err => {
      console.log(err)
    });
}

export const updateGames = (games) => dispatch => {
  dispatch({
    type: GET_GAMES,
    payload: {
      games
    }
  })
}

export const addParticipant = (game_id, user_id) => dispatch =>{
  let body = JSON.stringify({participant: {num_of_answers: 0, num_of_moves: 0, game_id: game_id, user_id: user_id}})
  axios
    .post(`${API_ROOT}/participants`, body)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const createNewGame = (startDate, endDate, user_id) => () => {
  let body = JSON.stringify({game: {start_date: startDate, end_date: endDate, admin: user_id}})
  console.log(body)
  axios
    .post(`${API_ROOT}/games`, body)
    .then(res => {
      console.log('request done')
    })
    .catch(err => {
      console.log(err)
    });
}

export const setGameCreator = (user_id) => dispatch => {
  dispatch({
    type: SET_GAME_CREATOR,
    payload: {
      gameCreator: user_id
    }
  })
}
