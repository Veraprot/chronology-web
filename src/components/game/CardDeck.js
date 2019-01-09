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
class CardDeck extends Component {
    render() {
      return (
        <>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="card-deck-container"
                ref={provided.innerRef}>
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