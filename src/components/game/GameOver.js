import React from 'react'
import {connect} from 'react-redux'

class GameOver extends React.Component {

  hideModule = () => {
    window.location.href = '/stats'
  }

  ignoreExit = event => {
    event.stopPropagation();
  }

  render() {
    return (
      <div className="modal-wrapper" onClick={this.hideModule}>
        <div className="modal-container" onClick={this.ignoreExit}>
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
