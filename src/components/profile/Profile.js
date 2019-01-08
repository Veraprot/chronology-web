import React from 'react'
import {connect} from 'react-redux'

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>profile</h1>
    )
  }
}


const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, { })(
  (Profile)
);
