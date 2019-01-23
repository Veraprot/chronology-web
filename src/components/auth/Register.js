import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="auth-form register">
        <div className="form-container">
          <h1 className="display-4 text-center">Sign Up</h1>
          <Form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            <TextFieldGroup
              placeholder="Email"
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
            <TextFieldGroup
              placeholder="Confirm Password"
              name="password_confirmation"
              type="password"
              value={this.state.password_confirmation}
              onChange={this.onChange}
              error={errors.password_confirmation}
            />
            <Button type="submit" className="form-btn register-btn">Submit</Button>
          </Form>
          <div className="bottom-form-section sign-up-section">
            <span className="info-text">Already have an account?</span>
            <Link to={'/login'}>Log in</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
