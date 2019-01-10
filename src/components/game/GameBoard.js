import React, { Component } from 'react';
import {connect} from 'react-redux'
import CardDeck from './CardDeck'
import Timeline from './Timeline'
import { DragDropContext } from 'react-beautiful-dnd';
import {moveCard, updateCard } from '../../actions/gameActions';

const checkAnswer = (activeCard, destination, droppableDestination ) => {
  if( droppableDestination.index == 0 ) {
    let dateAfter = destination[droppableDestination.index].date
    return activeCard.date < dateAfter
  } else 
    if(droppableDestination.index == destination.length) {
    let cardBefore = destination[droppableDestination.index - 1].date
    return activeCard.date > cardBefore
  } else {
    let cardBefore = destination[droppableDestination.index - 1].date
    let cardAfter = destination[droppableDestination.index].date
    return activeCard.date > cardBefore && activeCard.date < cardAfter
  }
}

class GameBoard extends Component {
  id2List = {
    activeCard: 'activeCard',
    answeredCards: 'answeredCards'
  };

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
  
    const [activeCard] = sourceClone.splice(droppableSource.index, 1); 
    console.log('active card', activeCard)
    const answer = checkAnswer(activeCard, destination, droppableDestination);
    console.log(answer)
  
    const result = {};
    if(answer) {
      destClone.splice(droppableDestination.index, 0, activeCard);
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
      this.props.moveCard(result.answeredCards)
      this.props.updateCard(this.props.game.cards);
    } else {
      result[droppableSource.droppableId] = activeCard;
      result[droppableDestination.droppableId] = destClone;
    }
    console.log(result)
    return result;
  };

  getList = id => this.props.game[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }

    if (source.droppableId !== destination.droppableId) { 
      const result = this.move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
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
