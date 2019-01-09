import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import {answerCard} from '../../actions/gameActions';

const itemSource = {
  beginDrag(props) {
    props.activateCard(props.game.activeCard)
    return props.game.activeCard;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    props.answerCard(props.game.activeCard, props.game.cards)
    return props.game.activeCard
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class CardDeck extends Component {
  render() {
    const { isDragging, connectDragSource, item } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(
      <div className="item" style={{ opacity }}>
        <span>{this.props.game.activeCard.date}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
})

CardDeck = DragSource('item', itemSource, collect)(CardDeck);

export default connect(mapStateToProps, {answerCard})((CardDeck));

