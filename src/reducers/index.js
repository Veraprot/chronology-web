import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';
import dashboardReducer from './dashboardReducer';
import multiPlayerGameReducer from './multiPlayerGameReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer, 
  multiPlayerGame: multiPlayerGameReducer,
  game: gameReducer
})
