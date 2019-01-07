import React from 'react'
import { connect } from 'react-redux';

import { getProfile }  from '../../actions/profileActions';
import {createProfile } from '../../actions/profileActions';
import Login from '../auth/Login';


//remove later are user userform component
import { Container, Button, Form } from 'semantic-ui-react'

const Home = (props) => {
  return (
    <div className="home-container">
      <Login/>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile, createProfile })(
  (Home)
);
