import React from 'react'
import {connect} from 'react-redux'

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>game board</h1>
    )
  }
}


const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, { })(
  (GameBoard)
);
