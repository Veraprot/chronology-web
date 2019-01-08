import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';
import GameBoard from './components/game/GameBoard';
import Profile from './components/profile/Profile';


import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/App.scss';

// Import routing components
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/layouts/NavBar'
import Home from './components/layouts/Home'

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  console.log('yesss')
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log('outdated');
    
    // Logout user
    // store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar/>
            <div className="main">
              <Route exact path='/' component={Home}/>
              <Route exact path="/game" component={GameBoard} />
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
