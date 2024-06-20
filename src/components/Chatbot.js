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
    question: "For how many people?",
    options: ["1", "2"]
  },
  {
    question: "How hungry are you?",
    options: ["Not so hungry", "Pretty hungry", "Very hungry"]
  }
];

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [peopleCount, setPeopleCount] = useState("3");

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

  const handleRestartChat = () => {
    setChatHistory([]);
    setCurrentQuestionIndex(0);
    setResponses({});
    setPeopleCount("3");
  };

  return (
    <div className="chat-window">
      {chatHistory.map((chat, index) => (
        <ChatMessage key={index} from={chat.from} message={chat.message} />
      ))}
      {currentQuestionIndex !== -1 && (
        <div className="chat-message bot">
          {questions[currentQuestionIndex].question}
          <Options
            options={questions[currentQuestionIndex].options}
            onOptionClick={handleOptionClick}
            showPeopleInput={currentQuestionIndex === 1}
            peopleCount={peopleCount}
            onPeopleChange={handlePeopleChange}
            onPeopleInputChange={handlePeopleInputChange}
            onPeopleSubmit={handlePeopleSubmit}
          />
        </div>
      )}
      <div className="responses">
        <h3>User Responses:</h3>
        <ul>
          {Object.entries(responses).map(([question, answer], index) => (
            <li key={index}><strong>{question}</strong>: {answer}</li>
          ))}
        </ul>
        <button onClick={handleRestartChat} className="restart-button">Restart Chat</button>
      </div>
    </div>
  );
};

export default Chatbot;
