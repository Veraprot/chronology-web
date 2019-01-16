import axios from 'axios';
import { API_ROOT } from '../constants';
import {GET_GAMES, SET_ACTIVE_GAME} from './types';

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

export const setActiveGame = (id) => dispatch => {
  dispatch({
    type: SET_ACTIVE_GAME,
    payload: {
      activeGame: id
    }
  })
}

export const updateGames = (games) => dispatch => {
  dispatch({
    type: GET_GAMES,
    payload: {
      games
    }
  })
}

export const createNewGame = ({startDate, endDate}) => dispatch => {
  let body = JSON.stringify({game: {start_date: startDate, end_date: endDate}})
  axios
    .post(`${API_ROOT}/games`, body)
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
