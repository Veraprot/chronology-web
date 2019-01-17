import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';
import dashboardReducer from './dashboardReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer, 
  game: gameReducer
})
