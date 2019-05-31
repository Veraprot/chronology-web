import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {SET_CURRENT_USER, GET_ERRORS} from './types';
import jwt_decode from 'jwt-decode';

const baseUrl = 'http://localhost:3001/api/v1'

export const loginUser = userData => dispatch => {
  let body = JSON.stringify({user: userData})
  axios
    .post(
      `${baseUrl}/login`, 
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

export const registerUser = (userData, history) => dispatch => {
  let body = JSON.stringify({user: userData})
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
    .then(res => {
      console.log(res)
      history.push('/login')
    })
}

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

// // get info of logged in user 
// export const findCurrentUser = () => {
//   return (dispatch) => {
//     return fetch(BACKEND, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.token}`
//       }
//     })
//       .then(res => res.json())
//       .then(json => {
//         dispatch({
//           type: FIND_CURRENT_USER,
//           payload: json
//         })
//       })

//   }
// }
