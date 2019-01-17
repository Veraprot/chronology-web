import React, { Component } from 'react';
import {connect} from 'react-redux'

class GameMultiBoard extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="board-container">
        hi
      </div>
    );
  }
}

const mapStateToProps = state => ({
  multiPlayerGame: state.multiPlayerGame
});


export default connect(mapStateToProps, {})(
  (GameMultiBoard)
);
