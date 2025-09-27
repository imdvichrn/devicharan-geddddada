import React, { useState } from 'react';
import getResponse from './echoless';

export default function ChatBoard() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userInput) => {
    setMessages([...messages, { sender: 'user', text: userInput }]);
    const reply = await getResponse(userInput);
    setMessages(prev => [...prev, { sender: 'echoless', text: reply }]);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(e.target.value)}
      />
    </div>
  );
}
