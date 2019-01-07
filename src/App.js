import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/App.scss';

// Import routing components
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/layouts/NavBar'
import Home from './components/layouts/Home'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar/>
            <div className="main">
              <Route exact path='/' component={Home}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
