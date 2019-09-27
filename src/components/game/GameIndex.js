import React from 'react'
import {connect} from 'react-redux'
import GameForm from './GameForm'
import GameBoard from './GameBoard'
import GameOver from './GameOver'
import { getGame } from '../../actions/gameActions';

class GameIndex extends React.Component {
  componentDidMount = () => {
    this.props.getGame()
  }
  render() {
    return (
      <>
      { this.props.game.gameStatus === 'inactive' &&
        <GameForm module="true"/>
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


export default connect(mapStateToProps, {getGame})(
  (GameIndex)
);
