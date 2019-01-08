import React from 'react'
import { getProfile } from '../../actions/profileActions';
import {connect} from 'react-redux'
import GameForm from './GameForm'
import GameBoard from './GameBoard'


class GameIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <GameForm/>
        <GameBoard/>
      </>
    )
  }
}


const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, { getProfile })(
  (GameIndex)
);
