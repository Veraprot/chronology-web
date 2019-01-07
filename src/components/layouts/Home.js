import React from 'react'
import { connect } from 'react-redux';

import { getProfile }  from '../../actions/profileActions';
import {createProfile } from '../../actions/profileActions';


//remove later are user userform component
import { Container, Button, Form } from 'semantic-ui-react'

const Home = (props) => {
  return (
    <div className="home-container">
      <Container>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input name="username" placeholder='username' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile, createProfile })(
  (Home)
);
