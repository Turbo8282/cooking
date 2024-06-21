// File: src/components/GPTPrompt.js
import React, { useState } from 'react';
import OpenAI from "openai"; 

// Initialise OpenAI Client with your API Key
const openai = new OpenAI({ apiKey: 'sk-proj-lzqztINNCageXj6XxxbHT3BlbkFJtaJJ7XZScsGCvn4fwxnS', dangerouslyAllowBrowser: true});

const GPTPrompt = ({ responses }) => {
  const [exportedResponses, setExportedResponses] = useState(null);

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
  
  const handleExport = async () => {
    const formattedPrompt = formatPrompt(responses);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You are a cooking assistant."
          },
          {
            "role": "user",
            "content": formattedPrompt
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
      });
      setExportedResponses(response.choices[0].message.content);
    } catch (error) {
      console.error('Error completing dasdasdchat:', error);
    }
  };
  
  return (
    <div className="gpt-prompt">
      <h3>GPT Prompt:</h3>
      <pre>{formatPrompt(responses)}</pre>
      <button onClick={handleExport} className="restart-button">Confirm cooking request</button>
      {exportedResponses && (
        <div>
          <h4>Exported Responses:</h4>
          <pre>{exportedResponses}</pre>
        </div>
      )}
    </div>
  );
};

export default GPTPrompt;
