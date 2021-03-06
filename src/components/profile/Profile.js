import React from 'react'
import {connect} from 'react-redux'
import { getProfileStats } from '../../actions/profileActions';
import {suffixConverter} from '../common/suffixConverter'
import { Button } from 'semantic-ui-react'
import {createTimeline } from '../../actions/gameActions';
import { withRouter } from 'react-router'

class Profile extends React.Component {
  componentDidMount = () => {
    this.props.getProfileStats();
  }

  convertDate = (start, end) => {
    let startCentury = Math.floor(parseInt(start.split("-")[0]) / 100) + 1
    let endCentury = Math.floor(parseInt(end.split("-")[0]) / 100)
    if(startCentury !== endCentury) {
      return `${suffixConverter(startCentury)}-${suffixConverter(endCentury)} Century`
    } else {
      return `${suffixConverter(endCentury)} Century`
    }
  }

  startNewGame = (e) => {
    e.preventDefault();
    this.props.history.push('/game')
  }

  repeatGame = (e) => {
    e.preventDefault();
    let start = document.getElementById("timeline-dates").dataset.startdate
    let end = document.getElementById("timeline-dates").dataset.enddate
    this.props.createTimeline(start, end, this.props.history)
    console.log(start, end)
    console.log(this.props)
  }

  renderStats = () => {
    return (
      <>
        <h1>Game Stats</h1>
        <div className="stats-container">
        {
          this.props.profile.gameStats.map(gameStat => 
            <div key={gameStat.id} className="stats-inner-container">
              <ul className="timeline-container">
                <li id="timeline-dates" data-startdate={`${gameStat.game.start}`} data-enddate={`${gameStat.game.end}`}>{this.convertDate(gameStat.game.start, gameStat.game.end)}</li>
              </ul>
              <div className="stats-info-container">
                <div className="stats-info">
                  Moves:  {gameStat.num_of_moves}
                </div>
                <div className="stats-info">
                  Score: {gameStat.score}
                </div>
                <Button className="stats-info repeat-btn" onClick={this.repeatGame}>Play Again</Button>
              </div>
            </div>
          )
        }
        </div>
      </>
    )
  }

  emptyStats = () => {
    const { isAuthenticated } = this.props.auth;
    if(isAuthenticated) {
      return(
        <Button onClick={this.startNewGame}>Play new game!</Button>
      )
    }
  }
  
  render() {
    const { gameStats } = this.props.profile
    return (
      <div className="stats-view">
          {gameStats.length > 0 ? this.renderStats() : this.emptyStats()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  profile: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, 
  {getProfileStats, createTimeline})(withRouter(Profile));
