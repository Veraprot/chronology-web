import React, { Component } from 'react';
import {connect} from 'react-redux'
import CardDeck from './CardDeck'
import Timeline from './Timeline'
import { DragDropContext } from 'react-beautiful-dnd';
import {registerUserMove, moveCard, updateCard, endGame } from '../../actions/gameActions';

const checkAnswer = (activeCard, destination, droppableDestination ) => {
  if( droppableDestination.index === 0 ) {
    let dateAfter = destination[droppableDestination.index].date
    return activeCard.date < dateAfter
  } else 
    if(droppableDestination.index === destination.length) {
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
      timer: 0,
      answered: false //rename this later 
    }
  }

  id2List = {
    activeCard: 'activeCard',
    answeredCards: 'answeredCards'
  };

  move = (question, timelineCards, droppableSource, droppableDestination) => {
    this.props.registerUserMove(this.props.game.moves)
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

      if(answeredCards.length === this.props.game.timelineLimit) {
        // this.stopTimer();
        this.props.endGame(this.props.game.moves, this.props.game.timelineLimit, this.props.game.activeGame);
      } else {
        this.props.updateCard(this.props.game.cards);
      }
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

  // componentDidMount = () => {
  //   this.startTimer()
  // }

  // componentWillUnmount = () => {
  //   this.stopTimer()
  // }

  startTimer = () => {
    console.log(this.state)
    this.time = setInterval(() => this.setState({
      ...this.state,
      timer: this.state.timer + 1
    }), 1000);
  }

  stopTimer = () => {
    this.time = clearInterval(this.state.timer)
    this.setState({
      ...this.state,
      timer: 0
    })
  }

  render() {
    console.log(this.props)
    return (
      <>
        {/* <div className="score-board">
          <div className="timer">
            Time: {this.state.timer}
          </div>
        </div> */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="board-container">
            <CardDeck onDragEnd={this.onDragEnd} answered={this.state.answered}/>
            <Timeline onDragEnd={this.onDragEnd} disabled={true}/> 
          </div>
        </DragDropContext>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game
});


export default connect(mapStateToProps, {registerUserMove,moveCard, updateCard, endGame})(
  (GameBoard)
);
