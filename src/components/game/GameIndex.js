import React from 'react'
import {connect} from 'react-redux'
import GameForm from './GameForm'
import GameBoard from './GameBoard'
import GameOver from './GameOver'

class GameIndex extends React.Component {
  render() {
    return (
      <>
      { this.props.game.gameStatus === 'inactive' &&
        <GameForm/>
      }
      { this.props.game.gameStatus === 'in progress' &&
        <GameBoard/>
      }
      { this.props.game.gameStatus === 'ended' &&
        <GameOver/>
      }
    </>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {})(
  (GameIndex)
);
