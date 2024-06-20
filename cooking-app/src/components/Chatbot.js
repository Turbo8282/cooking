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
    options: ["1", "2", "Other"]
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
  const [otherPeopleCount, setOtherPeopleCount] = useState("");

  const handleOptionClick = (option) => {
    const newChatHistory = [...chatHistory, { from: 'bot', message: questions[currentQuestionIndex].question }, { from: 'user', message: option }];
    setChatHistory(newChatHistory);
    setResponses({ ...responses, [questions[currentQuestionIndex].question]: option });

    if (currentQuestionIndex === 1 && option === "Other") {
      // Show input for custom number of people
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentQuestionIndex(-1);
      }
    }
  };

  const handlePeopleInputChange = (e) => {
    setOtherPeopleCount(e.target.value);
  };

  const handlePeopleSubmit = () => {
    const newChatHistory = [...chatHistory, { from: 'bot', message: questions[currentQuestionIndex].question }, { from: 'user', message: otherPeopleCount }];
    setChatHistory(newChatHistory);
    setResponses({ ...responses, [questions[currentQuestionIndex].question]: otherPeopleCount });
    setOtherPeopleCount("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
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
            showInput={currentQuestionIndex === 1}
            inputValue={otherPeopleCount}
            onInputChange={handlePeopleInputChange}
            onSubmit={handlePeopleSubmit}
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
      </div>
    </div>
  );
};

export default Chatbot;
