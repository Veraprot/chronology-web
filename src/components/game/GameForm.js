import React from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createTimeline } from '../../actions/gameActions';

import { isValidDate } from '../../validation/is-valid-date'

const GameForm = (props) => {  
  const submitDates = (event) => {
    let startDate = event.target.startDate.value;
    let endDate = event.target.endDate.value;    

    if(isValidDate(startDate) && isValidDate(endDate)) {
      let start = startDate.split('-').join('')
      let end = endDate.split('-').join('')
      props.createTimeline(start, end)
    } else  {
      console.log('handle errors yo')
    }
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <Form onSubmit={submitDates} className="timeline-form">
          <Form.Group inline>
            <Form.Field>
              <label color='white'>Start Date</label>
              <Input placeholder='YYYY-MM-DD' name="startDate"/>
            </Form.Field>
            <Form.Field>
              <label color='white'>End Date</label>
              <Input placeholder='YYYY-MM-DD' name="endDate"/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(mapStateToProps, {createTimeline})((GameForm));