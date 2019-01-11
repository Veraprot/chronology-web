import React from 'react'
import {connect} from 'react-redux'

class GameOver extends React.Component {
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-container">
          <div>Game over</div>
          <div className="end-game-container">
            <h3>Number of moves: {this.props.game.moves}</h3>
            <h3>Score: {this.props.game.score}</h3>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {})(
  (GameOver)
);
