// File: src/components/ChatMessage.js
import React from 'react';

const ChatMessage = ({ from, message }) => {
  return (
    <div className={`chat-message ${from}`}>
      {message}
    </div>
  );
};

export default ChatMessage;
