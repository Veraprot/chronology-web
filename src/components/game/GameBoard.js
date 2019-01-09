import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import CardDeck from './CardDeck';
import Timeline from './Timeline';

class GameBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activatedCard: null
    }
  }

  activateCard = (card) => {
    console.log('make a moving card idk')
    this.setState({
      activatedCard: card
    }, console.log(this.state))
  }

  renderCardDeck = () => {
    let activeCard = this.props.game.activeCard
    if(activeCard) {
      return (
        <CardDeck activateCard={this.activateCard}/>    
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

      <Timeline activatedCard={this.state.activatedCard}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
})
GameBoard = DragDropContext(HTML5Backend)(GameBoard);

export default connect(mapStateToProps, {})((GameBoard));

