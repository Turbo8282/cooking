// File: src/components/Chatbot.js
import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import Options from './Options';

const questions = [
  {
    question: "What food do you want?",
    options: ["Sweet", "Savoury"]
  },
  {
    question: "For?",
    options: ["Breakfast", "Lunch", "Dinner", "Snack"]
  },
  {
    question: "For how many people?",
    options: ["1", "2"]
  },
  {
    question: "How hungry are you?",
    options: ["Not so hungry", "Pretty hungry", "Very hungry"]
  },
  {
    question: "What specific nutrients are you looking for?",
    options: []
  }
];

const nutrientsOptions = ["Soluble fibre", "Protein", "Carbohydrates", "Vitamins", "Minerals", "Fats", "Water"];
const amountOptions = ["a small amount of", "a normal amount of", "a large amount of"];

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [peopleCount, setPeopleCount] = useState("3");
  const [nutrientRows, setNutrientRows] = useState([{ amount: "", nutrient: "" }]);
  const [editing, setEditing] = useState(false);
  const [editingResponseIndex, setEditingResponseIndex] = useState(null);

  const handleOptionClick = (option) => {
    const newChatHistory = [...chatHistory, { from: 'bot', message: questions[currentQuestionIndex].question }, { from: 'user', message: option }];
    setChatHistory(newChatHistory);
    setResponses({ ...responses, [questions[currentQuestionIndex].question]: option });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(-1);
    }
  };

  const handlePeopleChange = (increment) => {
    setPeopleCount((prevCount) => {
      const newCount = (parseInt(prevCount, 10) || 0) + increment;
      return newCount >= 3 ? newCount.toString() : "3";
    });
  };

  const handlePeopleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || (parseInt(value, 10) >= 3)) {
      setPeopleCount(value);
    }
  };

  const handlePeopleSubmit = () => {
    const count = parseInt(peopleCount, 10);
    const validCount = isNaN(count) || count < 3 ? "3" : peopleCount;
    const newChatHistory = [...chatHistory, { from: 'bot', message: questions[currentQuestionIndex].question }, { from: 'user', message: validCount }];
    setChatHistory(newChatHistory);
    setResponses({ ...responses, [questions[currentQuestionIndex].question]: validCount });
    setPeopleCount("3");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleNutrientChange = (index, key, value) => {
    const updatedRows = nutrientRows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    setNutrientRows(updatedRows);
  };

  const addNutrientRow = () => {
    setNutrientRows([...nutrientRows, { amount: "", nutrient: "" }]);
  };

  const handleNutrientSubmit = () => {
    const validRows = nutrientRows.filter(row => row.amount && row.nutrient);
    const newChatHistory = [
      ...chatHistory,
      { from: 'bot', message: questions[currentQuestionIndex].question },
      {
        from: 'user',
        message: (
          <ul>
            {validRows.map((row, i) => (
              <li key={i}>{row.amount} {row.nutrient}</li>
            ))}
          </ul>
        )
      }
    ];
    setChatHistory(newChatHistory);
    setResponses({
      ...responses,
      [questions[currentQuestionIndex].question]: validRows
    });
    setCurrentQuestionIndex(-1);  // End the questions
  };

  const handleRestartChat = () => {
    setChatHistory([]);
    setCurrentQuestionIndex(0);
    setResponses({});
    setPeopleCount("3");
    setNutrientRows([{ amount: "", nutrient: "" }]);
  };

  const handleEditResponses = () => {
    setEditing(!editing);
  };

  const handleEdit = (index) => {
    if (editing && chatHistory[index].from === 'user') {
      setEditingResponseIndex(index);
    }
  };

  const handleOptionEdit = (option) => {
    if (editingResponseIndex !== null) {
      const updatedChatHistory = chatHistory.map((chat, index) => index === editingResponseIndex ? { ...chat, message: option } : chat);
      const question = chatHistory[editingResponseIndex - 1].message;
      setChatHistory(updatedChatHistory);
      setResponses({ ...responses, [question]: option });
      setEditingResponseIndex(null);
    }
  };

  return (
    <div className="chat-window">
      {chatHistory.map((chat, index) => (
        <ChatMessage key={index} from={chat.from} message={chat.message} onEdit={() => handleEdit(index)} editing={editing} />
      ))}
      {currentQuestionIndex !== -1 && (
        <div className="chat-message bot">
          {questions[currentQuestionIndex].question}
          <Options
            options={questions[currentQuestionIndex].options}
            onOptionClick={editingResponseIndex !== null ? handleOptionEdit : handleOptionClick}
            showPeopleInput={currentQuestionIndex === 2}
            peopleCount={peopleCount}
            onPeopleChange={handlePeopleChange}
            onPeopleInputChange={handlePeopleInputChange}
            onPeopleSubmit={handlePeopleSubmit}
            showNutrientInputs={currentQuestionIndex === 4}
            nutrientRows={nutrientRows}
            onNutrientChange={handleNutrientChange}
            addNutrientRow={addNutrientRow}
            onNutrientSubmit={handleNutrientSubmit}
            amountOptions={amountOptions}
            nutrientsOptions={nutrientsOptions}
            isEditing={editing}
            currentResponse={responses[questions[currentQuestionIndex].question]}
            onSubmitEditedResponse={handleOptionEdit}
          />
        </div>
      )}
      <div className="responses">
        <h3>User Responses:</h3>
        <ul className="response-list">
          {Object.entries(responses).map(([question, answer], index) => (
            <li key={index} className={question === "What specific nutrients are you looking for?" ? "nutrient-response" : "inline-response"}>
              <strong>{question}</strong>
              {Array.isArray(answer) ? (
                <ul className="response-nutrient-list">
                  {answer.map((a, i) => (
                    <li key={i}>{a.amount} {a.nutrient}</li>
                  ))}
                </ul>
              ) : (
                <span>{answer}</span>
              )}
            </li>
          ))}
        </ul>
        <button onClick={handleRestartChat} className="restart-button">Restart Chat</button>
        <button onClick={handleEditResponses} className="edit-button">{editing ? 'Save Responses' : 'Edit Responses'}</button>
      </div>
    </div>
  );
};

export default Chatbot;
