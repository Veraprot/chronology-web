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
} //this is ugly fix it 

class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answered: false //rename this later 
    }
  }

  id2List = {
    activeCard: 'activeCard',
    answeredCards: 'answeredCards'
  };

  move = (question, timelineCards, droppableSource, droppableDestination) => {
    const questionCard = Array.from(question);
    const answeredCards = Array.from(timelineCards);
  
    const [activeCard] = questionCard.splice(droppableSource.index, 1); 
    const answer = checkAnswer(activeCard, timelineCards, droppableDestination);
  
    if(answer) {
      this.setState({
        answered: false
      })
      answeredCards.splice(droppableDestination.index, 0, activeCard);      
      this.props.moveCard(answeredCards)
      this.props.updateCard(this.props.game.cards);
    } else {
      this.setState({
        answered: true
      })

      setTimeout(() => {
        this.setState({
          answered: false
        })
      }, 2000);

      //weird but works for card animation
      setTimeout(() => {
        console.log('this runs')
        this.props.updateCard(this.props.game.cards);
      }, 2360);
    }
  };

  getList = id => this.props.game[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }

    if (source.droppableId !== destination.droppableId) { 
      this.move(
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
          <CardDeck onDragEnd={this.onDragEnd} answered={this.state.answered}/>
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
