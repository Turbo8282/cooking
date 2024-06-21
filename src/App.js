// File: src/App.js
import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import Title from './components/Title';
import GPTPrompt from './components/GPTPrompt';

import './App.css';

const App = () => {
  const [responses, setResponses] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Title text="Cooking AI Thingo" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Chatbot onResponsesChange={setResponses} />
      <div className="gpt-prompt-container">
        <GPTPrompt responses={responses} />
      </div>
    </div>
  );
};

export default App;
