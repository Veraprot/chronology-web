import React from 'react'
import {connect} from 'react-redux'
import { getProfileStats } from '../../actions/profileActions';
import {suffixConverter} from '../common/suffixConverter'

class Profile extends React.Component {
  componentDidMount = () => {
    this.props.getProfileStats();
  }

  convertDate = (start, end) => {
    let startCentury = suffixConverter(start.split("-")[0][0])
    let endCentury = suffixConverter(end.split("-")[0] / 100)    

    if(startCentury !== endCentury) {
      return `${startCentury}-${endCentury} Century`
    } else {
      return `${startCentury} Century`
    }
  }

  renderStats = () => {
    return this.props.profile.gameStats.map(gameStat => {
      return(
        <div key={gameStat.id} className="stats-inner-container">
          <div className="timeline-container">
            <div className="timeline">
              <span>{this.convertDate(gameStat.game.start, gameStat.game.end)}</span>
            </div>
          </div>
          <div className="stats-info-container">
            <div className="stats-info">
              Moves:  {gameStat.num_of_moves}
            </div>
            <div>
              Score: {gameStat.score}
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="stats-view">
        <h1>Game Stats</h1>
        <div className="stats-container">
          {this.renderStats()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});


export default connect(mapStateToProps, {getProfileStats})(
  (Profile)
);
