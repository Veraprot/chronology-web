import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({games, handleActiveParticipant }) => {
  return (
    <>
      {games.map(game => {
        return (
          <ActionCable
            key={game.id}  
            channel={{ channel: 'ParticipantsChannel', game: game.id }}
            onReceived={handleActiveParticipant}
          />
        );
      })}
    </>
  );
};

export default Cable;