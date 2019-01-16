import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';

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

const mapGames = (games, handleClick) => {
  return games.map(game => {
    return (
      <li key={game.id} onClick={() => handleClick(game.id)}>
        {game.start_date}
      </li>
    );
  });
};

class GameDashoard extends Component {
  componentDidMount = () => {
    this.props.getGames()
  };

  handleClick = id => {
    this.props.setActiveGame(id)
  };

  handleActiveParticipant = response => {
    const { participant } = response;
    const games = [...this.props.multiPlayerGames.games];
    const game = games.find(
      game => game.id === participant.game_id
    );
    game.participants = [...game.participants, participant];
    this.props.updateGames(games)
  };

  render = () => {
    const { games, activeGame } = this.props.multiPlayerGames;
    console.log(this.props)
    return (
      <>
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.props.multiPlayerGames.games.length ? (
          <Cable
            games={games}
            handleActiveParticipant={this.handleActiveParticipant}
          />
        ) : null}
        <h2>Games</h2>
        <ul>{mapGames(games, this.handleClick)}</ul>
        <NewGameForm />
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
