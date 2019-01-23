import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/stats');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/stats');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = e => {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="auth-form login">
        <div className="form-container">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">
            Sign in to play game 
          </p>
          <Form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />

            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <Button type="submit" className="form-btn login-btn">Submit </Button>
          </Form>
          <div className="bottom-form-section sign-up-section">
            <span className="info-text">Don't have an account?</span>
            <Link to={'/register'}>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Login = withRouter(Login)
export default connect(mapStateToProps, {loginUser})(Login);

