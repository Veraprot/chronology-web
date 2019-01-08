import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer, 
  game: gameReducer
})
