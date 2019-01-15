import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { clearCurrentProfile } from '../../actions/profileActions';
import { logoutUser } from '../../actions/authActions';

class NavBar extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  authLinks = () => {
    return (
      <a
        href=""
        onClick={this.onLogoutClick}
        className="nav-link"
      >
        Logout
      </a>
    )
  };

  guestLinks = () => { 
    return (
      <>
        <Link className="nav-link" to={"/register"}>
          Sign Up
        </Link>
        <Link className="nav-link" to={"/login"}>
          Login
        </Link>
      </>
    )
  };
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className={this.props.game.gameView ? "navbar game-mode" : "navbar"}>
        <Link to={`/game`} className="nav-link">Game</Link>
        <Link to={`/stats`} className="nav-link">User Statistics</Link>
        <Link to={`/`} className="nav-link">Home</Link>
        {isAuthenticated ? this.authLinks() : this.guestLinks()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  auth: state.auth
});


export default connect(mapStateToProps, {clearCurrentProfile, logoutUser})(
  (NavBar)
);
