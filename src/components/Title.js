// File: src/components/Title.js
import React from 'react';

const Title = ({ text, darkMode, toggleDarkMode }) => {
  return (
    <div className="title">
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1>{text}</h1>
    </div>
  );
};

export default Title;
