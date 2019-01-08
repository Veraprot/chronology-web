import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

const itemSource = {
  beginDrag(props) {
    return props.item;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return props.handleDrop(props.item.id);
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
        <span>{item.date}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
})

CardDeck = DragSource('item', itemSource, collect)(CardDeck);

export default connect(mapStateToProps, {})((CardDeck));

