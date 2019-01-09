import React from 'react'
import {connect} from 'react-redux'
import GameForm from './GameForm'
import GameBoardOne from './GameBoard'

class GameIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(Object.keys(this.props.game.activeCard).length)
    return (
      <>
      { !this.props.game.gameView &&
        <GameForm/>
      }
      <GameBoardOne/>
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
