import axios from 'axios';

import {
  GET_PROFILE,
  CREATE_PROFILE,
  CLEAR_CURRENT_PROFILE
} from './types';


const baseUrl = 'http://localhost:3001/api/v1'

export const getProfile = (username, history) => dispatch => {
  let body = JSON.stringify({user: {username}})
  axios
    .post(
      `${baseUrl}/users`, 
      body,
      {
      headers: {
        'Content-Type': 'application/json',
      }
  })
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
      history.push('/game')
    })
    .catch(err => {
      console.log(err)
    });
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};