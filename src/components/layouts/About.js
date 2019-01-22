import React from 'react'

const About = props => {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h1>Very awkwardly styled about page</h1>
        <div className="game-info">
          Chronology is a card game of all time. More specifically, during the game each player builds a timeline of cards, with each card listing an historical event and the year in which it occurred.

          At the start of the game, players are dealt two cards, which are then placed face up in chronological order. On her turn, a player is read an event from a new card; the player must then indicate the position on her own timeline where the card should be placed. If she's correct, she takes possession of the card and inserts it in her line; if not, the next player gets a crack at it, and so on. The first player with ten cards wins.

          Some versions of Chronology have players compete to create a timeline of only five cards...
          <a 
          className="info-link" href="https://boardgamegeek.com/boardgame/834/chronology">Learn More</a>
        </div>
      </div>
    </div>
  )
}

export default About