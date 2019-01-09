import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import CardDeck from './CardDeck'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {moveCard } from '../../actions/gameActions';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log(source)
    const sourceClone = Array.from(source);
    console.log(sourceClone)
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};

const grid = 8;


class GameBoard extends Component {
    state = {
        items: this.props.game.activeCard,
        selected: this.props.game.answeredCards
    };

    id2List = {
        droppable: 'cards',
        droppable2: 'answeredCards'
    };

    getList = id => this.props.game[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            this.props.moveCard(result.droppable, result.droppable2);
        }
    };

  render() {
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <CardDeck onDragEnd={this.onDragEnd}/>
        </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});


export default connect(mapStateToProps, {moveCard})(
  (GameBoard)
);
