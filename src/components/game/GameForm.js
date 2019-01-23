import React from 'react'
import { Button, Form } from 'semantic-ui-react'
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

  handleChange = (event) => {
    let selectedTime = ''
    if(event.currentTarget.textContent) {
      selectedTime = historyDates.find(date => date.text === event.currentTarget.textContent)
      let timeInterval = selectedTime.value.split("/")
      this.setState({
        startDate: [...this.state.startDate, timeInterval[0]],
        endDate: [...this.state.endDate, timeInterval[1]]
      })
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
    this.props.createTimeline(start, end)
  }

  hideModule = () => {
    console.log(window.location)
    window.location.href = '/stats'
  }

  ignoreExit = event => {
    event.stopPropagation();
  }

  renderForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Select fluid multiple label='Choose Time pediod...' options={historyDates} onChange={this.handleChange}placeholder='Choose time period...'/>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
  render() {
    console.log(this.props)
    return (
      <div className={this.props.module ? "modal-wrapper" : "timeline-form-wrapper"} onClick={this.hideModule}>
        <div className="modal-container" onClick={this.ignoreExit}>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(mapStateToProps, {createTimeline})((GameForm));

