import {SET_ACTIVE_GAME} from './types';

export const setActiveGame = (game) => dispatch => {
  dispatch({
    type: SET_ACTIVE_GAME,
    payload: {
      activeGame: game
    }
  })
}