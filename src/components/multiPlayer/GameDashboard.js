import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { Button, Form } from 'semantic-ui-react'

import {connect} from 'react-redux'
import {getGames, setActiveGame, updateGames } from '../../actions/multiPlayerGameActions';

import Cable from './Cable';
import NewGameForm from './NewGameForm';
import MessagesArea from './MessagesArea';
const findActiveGame = (games, activeGame) => {
  return games.find(
    game => game.id === activeGame
  );
};

// const mapGames = (games, handleClick) => {
//   return games.map(game => {
//     return (
//       <li key={game.id} onClick={() => handleClick(game.id)}>
//         {game.start_date}
//       </li>
//     );
//   });
// };

class GameDashoard extends Component {
  state = {
    newGame: false
  }

  componentDidMount = () => {
    this.props.getGames()
  };

  handleClick = id => {
    this.props.setActiveGame(id)
  };

  handleReceivedGame = response => {
    console.log('or here', response)
    const { game } = response;
    let games = [...this.props.multiPlayerGames.games, game]
    console.log(games)
    this.props.updateGames(games)
  };

  //this needs to be fixed
  handleReceivedParticipant = response => {
    console.log('here')
    // const { participant } = response;
    // const games = [...this.props.multiPlayerGames.games];
    // const game = games.find(
    //   game => game.id === participant.game_id
    // );
    // game.participants = [...game.participants, participant];
    // this.props.updateGames(games)
  };

  toggleNewGame = (e) => {
    e.preventDefault()
    this.setState({newGame: !this.state.newGame})
  }

  render = () => {
    console.log(this.props)
    const { games, activeGame } = this.props.multiPlayerGames;
    return (
      <>
        <ActionCable
          channel={{ channel: 'GamesChannel' }}
          onReceived={this.handleReceivedGame}
        />
        {this.props.multiPlayerGames.games.length ? (
          <Cable
            games={games}
            handleActiveParticipant={this.handleActiveParticipant}
          />
        ) : null}
        <h2>Games</h2>
        {/* <ul>{mapGames(games, this.handleClick)}</ul> */}
        {this.state.newGame &&
          <NewGameForm/>
        }
        <Button type='submit' onClick={this.toggleNewGame}>Start New Game</Button>
        {activeGame ? (
          <MessagesArea
            game={findActiveGame(
              games,
              activeGame
            )}
          />
        ) : null}
      </>
    );
  }
}
const mapStateToProps = state => ({
  multiPlayerGames: state.multiPlayerGames
});

export default connect(mapStateToProps, {getGames, setActiveGame, updateGames})(
  (GameDashoard)
);
