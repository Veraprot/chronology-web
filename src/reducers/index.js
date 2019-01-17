import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';
import multiPlayerGamesReducer from './multiPlayerGamesReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  multiPlayerGames: multiPlayerGamesReducer, 
  game: gameReducer
})
