import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {SET_CURRENT_USER, GET_ERRORS} from './types';
import jwt_decode from 'jwt-decode';

const baseUrl = 'http://localhost:3001/api/v1'

export const loginUser = userData => dispatch => {
  let body = JSON.stringify({auth: userData})
  console.log(userData)
  console.log(body)
  axios
    .post(
      `${baseUrl}/user_token`, 
      {user: userData},
      {
      headers: {
        'Content-Type': 'application/json',
      }
  })
    .then(res => {
      console.log(res.data)
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
