import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
});
class CardDeck extends Component {
    render() {
      return (
        <>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="card-deck-container"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {this.props.game.activeCard.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                            className="card-deck"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                            {`${card.event} index: ${index} id: ${card.id}`}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable 
          direction="horizontal"
          droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                className="timeline-container"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {this.props.game.answeredCards.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id}
                    index={index}>
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
                        {`${card.event} index: ${index} id: ${card.id}`}
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
  (CardDeck)
);