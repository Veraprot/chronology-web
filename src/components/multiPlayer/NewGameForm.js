import {connect} from 'react-redux'
import { createNewGame } from '../../actions/multiPlayerGameActions';

import React from 'react';
class NewGameForm extends React.Component {
  state = {
    startDate: '',
    endDate: ''
  };

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.createNewGame(this.state)
    this.setState({ 
      startDate: '',
      endDate: '' 
    });
  };

  render = () => {
    return (
      <div className="new-game-form">
        <form onSubmit={this.handleSubmit}>
          <label>New Game:</label>
          <br />
          <input
            name="startDate"
            type="text"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
          <input
            name="endDate"
            type="text"
            value={this.state.endDate}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  multiPlayerGames: state.multiPlayerGames
});

export default connect(mapStateToProps, {createNewGame})(
  (NewGameForm)
);
