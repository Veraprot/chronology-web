import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import CardDeck from './CardDeck';
import Timeline from './Timeline';
import {answerCard} from '../../actions/gameActions';

const update = require('immutability-helper');

class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
      activeCard: this.props.game.cards[0],
      targetItems: [],
    }
  }

  deleteItem = id => {
    let dragItem = this.state.items.find(item => item.id == id)
    this.setState(prevState => {
      return {
        items: prevState.items.filter(item => item.id !== id),
        targetItems: [...prevState.targetItems, dragItem]
      }
    })
  }

  renderCardDeck = () => {
    let activeCard = this.props.game.activeCard
    if(activeCard) {
      return (
        <CardDeck 
          key={activeCard.id}
          item={activeCard}
          handleDrop={() => this.props.answerCard(activeCard, this.props.game.cards)}
        />    
      )
    } else {
      return (
        <div>container</div>
      )
    }
  }
  render() {
    return (
      <>
      <div className="item-container">
        {this.renderCardDeck()}
      </div>

      <Timeline items={this.state.targetItems}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
})
GameBoard = DragDropContext(HTML5Backend)(GameBoard);

export default connect(mapStateToProps, {answerCard})((GameBoard));

