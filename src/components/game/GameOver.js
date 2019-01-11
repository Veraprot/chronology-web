import React from 'react'
import {connect} from 'react-redux'

class GameOver extends React.Component {
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-container">
          <div>hello</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {})(
  (GameOver)
);
