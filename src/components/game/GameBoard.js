import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import CardDeck from './CardDeck';
import Timeline from './Timeline';

const update = require('immutability-helper');

class GameBoard extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
      ],
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

  moveItem = (dragIndex, hoverIndex) => {
    const { targetItems } = this.state
    const dragItem = targetItems[dragIndex]

    this.setState(
      update(this.state, {
        targetItems: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]], 
        }
      })
    )
  }

  render() {
    return (
      <>
      <div className="item-container">
        {this.state.items.map((item, index) => (
          <CardDeck 
            key={item.id}
            item={item}
            handleDrop={(id) => this.deleteItem(id)}
              />
        ))}
      </div>

      <Timeline items={this.state.targetItems} moveItem={this.moveItem}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
})
GameBoard = DragDropContext(HTML5Backend)(GameBoard);

export default connect(mapStateToProps, {})((GameBoard));

