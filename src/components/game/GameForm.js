import React from 'react'
import { Input, Button, Form, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { connect } from 'react-redux';
import {createTimeline } from '../../actions/gameActions';
import historyDates from '../common/historyDates'

class GameForm extends React.Component {  
  constructor(props) {
    super(props)
    this.state = {
      startDate: [],
      endDate: []
    }
  }

  exitModal = () => {
    window.location.href = '/'
  }

  handleChange = (event) => {
    console.log(event.currentTarget.textContent)
    let selectedTime = ''
    if(event.currentTarget.textContent) {
      selectedTime = historyDates.find(date => date.text == event.currentTarget.textContent)
      let timeInterval = selectedTime.value.split("-")
      this.setState({
        startDate: [...this.state.startDate, timeInterval[0]],
        endDate: [...this.state.endDate, timeInterval[1]]
      }, () => console.log(this.state))
    } 
  }

  sortTimeline = (time) => {
    return this.state[time].sort((a, b) => {
      return a - b
    })
  }

  handleSubmit = () => {
    let sortedStart = this.sortTimeline('startDate')
    let sortedEnd = this.sortTimeline('endDate')
    let start = sortedStart[0]
    let end = sortedEnd[this.state.endDate.length - 1]
    console.log(start, end )
    this.props.createTimeline(start, end)
  }

  render() {
    return (
      <div className="modal-wrapper" onClick={this.exitModal}>
        <div className="modal-container">
          <Form onSubmit={this.handleSubmit}>
            <Form.Select fluid multiple label='Choose Time pediod...' options={historyDates} onChange={this.handleChange}placeholder='Choose time period...'/>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(mapStateToProps, {createTimeline})((GameForm));

