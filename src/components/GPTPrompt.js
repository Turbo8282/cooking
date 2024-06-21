// File: src/components/GPTPrompt.js
import React from 'react';

const GPTPrompt = ({ responses }) => {
  const formatPrompt = (responses) => {
    let prompt = "Decide what to cook based on the following preferences:\n";
    Object.entries(responses).forEach(([question, answer]) => {
      if (Array.isArray(answer)) {
        prompt += `${question}\n`;
        answer.forEach((item) => {
          prompt += `- ${item.amount} ${item.nutrient}\n`;
        });
      } else {
        prompt += `${question} ${answer}\n`;
      }
    });
    return prompt;
  };

  return (
    <div className="gpt-prompt">
      <h3>GPT Prompt:</h3>
      <pre>{formatPrompt(responses)}</pre>
    </div>
  );
};

export default GPTPrompt;
