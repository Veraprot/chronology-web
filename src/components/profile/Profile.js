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
        <div key={gameStat.id} className="stat-container">
          <h1>hi</h1>
        </div>
      )
    })
  }
  render() {
    return (
      <>
        <h1>profile</h1>
        {this.renderStats()}
      </>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});


export default connect(mapStateToProps, {getProfileStats})(
  (Profile)
);
