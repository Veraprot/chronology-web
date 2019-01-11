import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class NavBar extends React.Component {
  render() {
    return (
      <div className={this.props.game.gameView ? "navbar game-mode" : "navbar"}>
      <Link to={`/game`} className="nav-link">Game</Link>
      <Link to={`/stats`} className="nav-link">User Statistics</Link>
      <Link to={`/`} className="nav-link">Home</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {})(
  (NavBar)
);
