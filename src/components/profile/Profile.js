import React from 'react'
import {connect} from 'react-redux'
import { getProfileStats } from '../../actions/profileActions';

class Profile extends React.Component {
  componentDidMount = () => {
    this.props.getProfileStats();
  }

  renderStats = () => {
    console.log(this.props.profile.gameStats)
    return this.props.profile.gameStats.map(gameStat => {
      return(
        <div key={gameStat.id} className="stats-inner-container">
          <div className="timeline-container">
            <span>{gameStat.game.start}</span>
            <span>{gameStat.game.end}</span>
          </div>
          <div className="stats-info">
            <div>
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
