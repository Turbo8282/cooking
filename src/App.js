// File: src/App.js
import React from 'react';
import Chatbot from './components/Chatbot';
import Title from './components/Title';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Title text="Cooking AI Thingo" />
      <Chatbot />
    </div>
  );
};

export default App;
