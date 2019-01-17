import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { Button, Form } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

import {connect} from 'react-redux'
import {getGames, setActiveGame, updateGames, addParticipant } from '../../actions/multiPlayerGamesActions';

import Cable from './Cable';
import NewGameForm from './NewGameForm';

const mapParticipants = (participants) => {
  return participants.map(participant => {
    return (
      <div className="user-profile-container" key={participant.id}>
        <div className="username">{participant.user.user_name}</div>
      </div>
    )
  })
}

const mapGames = (games, handleClick) => {
  return games.map(game => {
    return (
      <div className="game-card" key={game.id} onClick={() => handleClick(game)}>
        <div className="game-time-range">
        {game.start_date} - {game.end_date}
        </div>
        {mapParticipants(game.participants)}
      </div>
    );
  });
};

class GameDashoard extends Component {
  state = {
    newGame: false
  }

  componentDidMount = () => {
    this.props.getGames()
  };

  handleClick = game => {
    console.log(game)
    if(game.participants[0].user_id != this.props.auth.user.user_id &&
      game.participants.length < 2
      ) {
      this.props.setActiveGame(game.id)
      this.props.addParticipant(game.id)
    } else {
      this.props.history.push('/chronology')
    }
  };

  handleReceivedGame = response => {
    const { game } = response;
    let games = [...this.props.multiPlayerGames.games, game]
    this.props.updateGames(games)
    console.log(this.props.auth.user.user_id)
    console.log(this.props.multiPlayerGames.gameCreator)
    if(this.props.auth.user.user_id == this.props.multiPlayerGames.gameCreator) {
      this.props.addParticipant(game.id)
    }
  };

  handleReceivedParticipant = response => {
    const { participant } = response;
    const games = [...this.props.multiPlayerGames.games];
    const game = games.find(
      game => game.id === participant.game_id
    );
    game.participants = [...game.participants, participant];
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
            handleReceivedParticipant={this.handleReceivedParticipant}
          />
        ) : null}
        <h2>Games</h2>
        <div className="active-games-container">
          {mapGames(games, this.handleClick)}
        </div>
        <div className={this.state.newGame? 'modal-wrapper' : 'modal-wrapper disabled'}  onClick={this.toggleNewGame}>
          <NewGameForm/>
        </div>
        <Button type='submit' onClick={this.toggleNewGame}>Start New Game</Button>
      </>
    );
  }
}
const mapStateToProps = state => ({
  multiPlayerGames: state.multiPlayerGames,
  auth: state.auth
});

export default connect(mapStateToProps, {getGames, setActiveGame, updateGames, addParticipant})(
  (withRouter(GameDashoard))
);
