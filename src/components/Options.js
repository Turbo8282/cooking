// File: src/components/Options.js
import React from 'react';

const Options = ({ options, onOptionClick, showInput, inputValue, onInputChange, onSubmit }) => {
  return (
    <div>
      {options.map((option, index) => (
        <button key={index} onClick={() => onOptionClick(option)}>{option}</button>
      ))}
      {showInput && options.includes("Other") && (
        <div>
          <input type="number" value={inputValue} onChange={onInputChange} placeholder="Type number of people" />
          <button onClick={onSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Options;
