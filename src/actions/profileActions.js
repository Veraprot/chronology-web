import axios from 'axios';
import { API_ROOT } from '../constants';

import {
  CLEAR_CURRENT_PROFILE, 
  GET_STATS
} from './types';


// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const getProfileStats = () => dispatch => {
  axios
    .get(`${API_ROOT}/participants`)
    .then(res => {
      dispatch({
        type: GET_STATS,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}