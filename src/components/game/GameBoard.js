import React, { Component } from 'react';
import {connect} from 'react-redux'
import CardDeck from './CardDeck'
import Timeline from './Timeline'
import { DragDropContext } from 'react-beautiful-dnd';
import {moveCard, updateCard } from '../../actions/gameActions';

const checkAnswer = (activeCard, destination, droppableDestination ) => {
  if( droppableDestination.index == 0 ) {
    let dateAfter = destination[droppableDestination.index].date
    console.log('first index', dateAfter)
    return activeCard.date < dateAfter
  } else 
    if(droppableDestination.index == destination.length) {
    let cardBefore = destination[droppableDestination.index - 1].date
    console.log('last index', cardBefore)
    return activeCard.date > cardBefore
  } else {
    let cardBefore = destination[droppableDestination.index - 1].date
    let cardAfter = destination[droppableDestination.index].date
    console.log('middle index', cardBefore, cardAfter)
    return activeCard.date > cardBefore && activeCard.date < cardAfter
  }
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  const [activeCard] = sourceClone.splice(droppableSource.index, 1); 

  const answer = checkAnswer(activeCard, destination, droppableDestination);

  const result = {};
  // if(answer) {
    destClone.splice(droppableDestination.index, 0, activeCard);
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  // } else {
  //   result[droppableSource.droppableId] = activeCard;
  //   result[droppableDestination.droppableId] = destClone;
  // }
  return result;
};

class GameBoard extends Component {
  id2List = {
    activeCard: 'activeCard',
    answeredCards: 'answeredCards'
  };

  getList = id => this.props.game[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }

    if (source.droppableId !== destination.droppableId) { 
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.props.moveCard(result.answeredCards);
      this.props.updateCard(this.props.game.cards)
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board-container">
          <CardDeck onDragEnd={this.onDragEnd}/>
          <Timeline onDragEnd={this.onDragEnd} disabled={true}/> 
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {moveCard, updateCard})(
  (GameBoard)
);
