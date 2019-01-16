import React, { Component } from 'react';
import {connect} from 'react-redux'

class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answered: false //rename this later 
    }
  }

  render() {
    return (
      <div className="board-container">
        hi
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {})(
  (GameBoard)
);
