import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import TimelineCard from './TimelineCard';

import { connect } from 'react-redux';
import {moveCard} from '../../actions/gameActions';
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
    console.log(props)
  }

  moveItem = (dragIndex, hoverIndex) => {
    const {answeredCards} = this.props.game
    const dragItem = answeredCards[dragIndex]
    this.props.moveCard(dragIndex, hoverIndex, dragItem, this.props.game.answeredCards, this.props.game.cards)
  }

  render() {
    console.log('here', this.props.game)
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';
    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
        Target
        <div className="item-container">
          {this.props.game.answeredCards.map((card, i) => (
            <TimelineCard
              key={card.id}
              index={i}
              id={card.id}
              text={card.date}
              moveItem={this.moveItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
})

Timeline = DropTarget('item', {}, collect)(Timeline);

export default connect(mapStateToProps, {moveCard})((Timeline));
