import React from 'react';
import NewGameForm from './NewGameForm';

const MessagesArea = ({
  game: { id, start_date, participants },
}) => {
  return (
    <div className="messagesArea">
      <h2>{start_date}</h2>
      <ul>{orderedParticipants(participants)}</ul>
      {/* <NewMessageForm game_id={id} /> */}
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedParticipants = participants => {
  const sortedParticipants = participants.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedParticipants.map(participant => {
    return <li key={participant.id}>{participant.username}</li>;
  });
};