import React from 'react'
import {connect} from 'react-redux'
import GameForm from './GameForm'
import GameBoard from './GameBoard'
import Test from './Test'

class GameIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
      { !this.props.game.gameView &&
        <GameForm/>
      }
      <GameBoard/>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Test/>
      </div>
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
