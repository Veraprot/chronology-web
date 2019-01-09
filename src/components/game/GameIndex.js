import React from 'react'
import {connect} from 'react-redux'
import GameForm from './GameForm'
import GameBoardOne from './GameBoard'

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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <GameBoardOne/>
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
