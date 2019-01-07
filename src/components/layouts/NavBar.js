import React from 'react'
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
      <Link to={`/game`} className="nav-link">Game</Link>
      <Link to={`/stats`} className="nav-link">User Statistics</Link>
      <Link to={`/`} className="nav-link">Home</Link>
      </div>
    )
  }
}

export default NavBar