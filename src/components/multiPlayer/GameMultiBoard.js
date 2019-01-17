import React, { Component } from 'react';
import {connect} from 'react-redux'

class GameMultiBoard extends Component {
  render() {
    return (
      <div className="board-container">
        hi
      </div>
    );
  }
}

const mapStateToProps = state => ({
  multiPlayerGame: state.multiPlayerGames
});


export default connect(mapStateToProps, {})(
  (GameMultiBoard)
);
