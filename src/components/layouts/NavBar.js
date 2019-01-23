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
      <>
        <Link to={`/stats`} className="nav-link">Stats</Link>
        <Link to={`/`} className="nav-link">Game</Link>
        <a
          href="/login"
          onClick={this.onLogoutClick}
          className="nav-link"
        >
          Logout
        </a>
      </>
    )
  };

  guestLinks = () => { 
    return (
      <>
        <div className="login-container">
          <Link className="nav-link auth-link" to={"/login"}>
            Login
          </Link>
          <span className="separator">/</span>
          <Link className="nav-link auth-link" to={"/register"}>
            Sign Up
          </Link>
        </div>
      </>
    )
  };
  
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className={this.props.game.gameView ? "navbar game-mode" : "navbar"}>
          <div className="left-menu">
            <Link to={'/'} className="nav-link logo">
              <div className="chronology-logo"></div>
            </Link>
          </div>
          <div className="right-menu">
            <Link to={`/about`} className="nav-link">About</Link>
            {isAuthenticated ? this.authLinks() : this.guestLinks()}
          </div>
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
