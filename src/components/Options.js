// File: src/components/Options.js
import React from 'react';

const Options = ({ options, onOptionClick, showPeopleInput, peopleCount, onPeopleChange, onPeopleInputChange, onPeopleSubmit }) => {
  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button key={index} className="option-button" onClick={() => onOptionClick(option)}>{option}</button>
      ))}
      {showPeopleInput && (
        <div className="people-input">
          <button onClick={() => onPeopleChange(-1)}>-</button>
          <input
            type="text"
            value={peopleCount}
            onChange={onPeopleInputChange}
            className="people-input-box"
          />
          <button onClick={() => onPeopleChange(1)}>+</button>
          <button onClick={onPeopleSubmit} className="submit-button">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Options;
