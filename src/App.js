import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import GameIndex from './components/game/GameIndex';
import GameDashboard from './components/dashBoard/GameDashboard';
import Profile from './components/profile/Profile';


import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/App.scss';

// Import routing components
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/layouts/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import GameMultiBoard from './components/multiPlayer/GameMultiBoard';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {    
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <NavBar/>
            <div className="main">
              <Route exact path="/register" component={Register} />
              <Route exact path='/login' component={Login}/>
              <Route exact path="/game" component={GameIndex} />
              <Route exact path="/chronology" component={GameMultiBoard} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={GameDashboard} />
                <PrivateRoute exact path="/" component={Profile} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
