import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import TimelineCard from './TimelineCard';

import { connect } from 'react-redux';
import {moveAnsweredCard} from '../../actions/gameActions';
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class Timeline extends Component {
  constructor(props) {
    super(props)
  }

  moveItem = (dragIndex, hoverIndex) => {
    const {answeredCards} = this.props.game
    const dragItem = answeredCards[dragIndex]
    this.props.moveAnsweredCard(dragIndex, hoverIndex, dragItem, this.props.game.answeredCards, this.props.game.cards)
  }

  renderTimelineCards = () => {
    let answeredCards = this.props.game.answeredCards
    console.log(answeredCards)
    if(answeredCards) {
      return this.props.game.answeredCards.map((card, i) => (
        <TimelineCard
          key={card.id}
          index={i}
          id={card.id}
          text={card.date}
          moveItem={this.moveItem}
        />
      ))
    } 
  }
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';
    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
        Target
        <div className="item-container">
          {this.renderTimelineCards()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
})

Timeline = DropTarget('item', {}, collect)(Timeline);

export default connect(mapStateToProps, {moveAnsweredCard})((Timeline));
