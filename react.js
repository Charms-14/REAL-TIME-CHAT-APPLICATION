// client/src/App.js
import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = new WebSocket("ws://localhost:5000");

  useEffect(() => {
    socket.onmessage = (event) => {
      const newMessages = JSON.parse(event.data);
      setMessages((prev) => [...prev, ...newMessages]);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.send(input);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Real-Time Chat</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
