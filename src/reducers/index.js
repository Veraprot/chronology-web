import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';
import multiPlayerGameReducer from './multiPlayerGameReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  multiPlayerGames: multiPlayerGameReducer, 
  game: gameReducer
})
