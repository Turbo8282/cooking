// File: src/components/ChatMessage.js
import React from 'react';

const ChatMessage = ({ from, message, onEdit, editing }) => {
  return (
    <div className={`chat-message ${from}`} onClick={editing && from === 'user' ? onEdit : null}>
      {message}
    </div>
  );
};

export default ChatMessage;
