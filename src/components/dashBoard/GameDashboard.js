import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { Button } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

import {connect} from 'react-redux'
import {getGames, updateGames, addParticipant } from '../../actions/dashboardActions';
import {setActiveGame} from '../../actions/multiPlayerGameActions';

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
    if(game.admin !== this.props.auth.user.user_id &&
      game.participants.length < 2
      ) {
      this.props.setActiveGame(game)
      this.props.addParticipant(game.id, this.props.auth.user.user_id)
      // this.props.history.push('/chronology')
    } else {
      console.log('something went wrong')
    }
  };

  handleReceivedGame = response => {
    const { game } = response;
    console.log('received game', game)
    let games = [...this.props.dashboard.games, game]
    this.props.updateGames(games)
    // console.log(this.props.auth.user.user_id)
    // console.log(game.admin)
    if(this.props.auth.user.user_id === game.admin) {
      this.props.addParticipant(game.id, game.admin)
    }
  };

  handleReceivedParticipant = response => {
    const { participant } = response;
    const games = [...this.props.dashboard.games];
    const game = games.find(
      game => game.id === participant.game_id
    );
    console.log('received participants')
    console.log(games)
    console.log(games.indexOf(game))
    game.participants = [...game.participants, participant];
    // this.props.updateGames(newGames)
  };

  toggleNewGame = (e) => {
    e.preventDefault()
    this.setState({newGame: !this.state.newGame})
  }

  render = () => {
    console.log('game dashboard render')
    console.log(this.props)
    const { games } = this.props.dashboard;
    return (
      <>
        <ActionCable
          channel={{ channel: 'GamesChannel' }}
          onReceived={this.handleReceivedGame}
        />
        {this.props.dashboard.games.length ? (
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
  dashboard: state.dashboard,
  auth: state.auth
});

export default connect(mapStateToProps, {getGames, setActiveGame, updateGames, addParticipant})(
  (withRouter(GameDashoard))
);
