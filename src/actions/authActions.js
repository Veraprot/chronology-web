import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {SET_CURRENT_USER, GET_ERRORS} from './types';
import jwt_decode from 'jwt-decode';

const baseUrl = 'http://localhost:3001/api/v1'

// Register User
export const registerUser = (userData, history) => dispatch => {
  let body = JSON.stringify({user: userData})
  console.log(body)
  axios
    .post(
      `${baseUrl}/users`, 
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  let body = JSON.stringify({auth: userData})
  axios
    .post(
      `${baseUrl}/user_token`, 
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    .then(res => {
      const token = res.data.jwt;
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

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
