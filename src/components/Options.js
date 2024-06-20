// File: src/components/Options.js
import React from 'react';

const Options = ({
  options,
  onOptionClick,
  showPeopleInput,
  peopleCount,
  onPeopleChange,
  onPeopleInputChange,
  onPeopleSubmit,
  showNutrientInputs,
  nutrientRows,
  onNutrientChange,
  addNutrientRow,
  onNutrientSubmit,
  amountOptions,
  nutrientsOptions
}) => {
  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button key={index} className="option-button" onClick={() => onOptionClick(option)}>{option}</button>
      ))}
      {showPeopleInput && (
        <div className="people-input">
          <button className="default-button" onClick={() => onPeopleChange(-1)}>-</button>
          <input
            type="text"
            value={peopleCount}
            onChange={onPeopleInputChange}
            className="people-input-box"
          />
          <button className="default-button" onClick={() => onPeopleChange(1)}>+</button>
          <button onClick={onPeopleSubmit} className="option-button">Submit</button>
        </div>
      )}
      {showNutrientInputs && (
        <div className="nutrient-inputs">
          {nutrientRows.map((row, index) => (
            <div key={index} className="nutrient-row">
              <select value={row.amount} onChange={(e) => onNutrientChange(index, 'amount', e.target.value)}>
                <option value="">Select amount</option>
                {amountOptions.map((amount, i) => (
                  <option key={i} value={amount}>{amount}</option>
                ))}
              </select>
              <select value={row.nutrient} onChange={(e) => onNutrientChange(index, 'nutrient', e.target.value)}>
                <option value="">Select nutrient</option>
                {nutrientsOptions.map((nutrient, i) => (
                  <option key={i} value={nutrient}>{nutrient}</option>
                ))}
              </select>
            </div>
          ))}
          <button onClick={addNutrientRow} className="default-button">Add another row</button>
          <button onClick={onNutrientSubmit} className="option-button">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Options;
