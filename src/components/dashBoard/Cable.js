import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({games, handleReceivedParticipant }) => {
  return (
    <>
      {games.map(game => {
        return (
          <ActionCable
            key={game.id}  
            channel={{ channel: 'ParticipantsChannel', game: game.id }}
            onReceived={handleReceivedParticipant}
          />
        );
      })}
    </>
  );
};

export default Cable;