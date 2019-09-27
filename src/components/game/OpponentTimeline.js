import React, { Component } from 'react';
import {connect} from 'react-redux'

class OpponentTimeline extends Component {
    render() {
      return (
        <div className="timeline-container">
          {this.props.game.answeredCards.map((card, index) => (
            <div
              key={index}
              className="timeline-card">
              <div className="card-event">
                {`${card.event}`}
              </div>
              <div className="card-date-container">
                <div className="card-date">
                  {`${card.date}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {})(
  (OpponentTimeline)
);