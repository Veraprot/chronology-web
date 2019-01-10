import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '',
});
class Timeline extends Component {
    render() {
      return (
        <>
          <Droppable 
          direction="horizontal"
          droppableId="answeredCards">
            {(provided, snapshot) => (
              <div
                className="timeline-container"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {this.props.game.answeredCards.map((card, index) => (
                  <Draggable
                    isDragDisabled={this.props.disabled}
                    key={card.id}
                    draggableId={card.id}
                    index={index}
                    date={card.date}>
                    {(provided, snapshot) => (
                      <div
                        className="timeline-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                        {`index: ${index} id: ${card.date}`}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </>
      );
    }
  }

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {})(
  (Timeline)
);