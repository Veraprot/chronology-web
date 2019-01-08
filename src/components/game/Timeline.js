import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import TimelineCard from './TimelineCard';
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

  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';
    console.log('item', this.props.item)
    console.log('target items arr', this.props.items)
    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
        Target
        <div className="item-container">
          {this.props.items.map((item, i) => (
            <TimelineCard
              key={item.id}
              index={i}
              id={item.id}
              text={item.name}
              moveItem={this.props.moveItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Timeline);
