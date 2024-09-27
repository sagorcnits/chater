import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('typing', (senderId) => {
      setTyping(senderId === socket.id);
    });

    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('sendMessage', { senderId: socket.id, receiverId: 'receiverId', message: newMessage });
      setNewMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', 'receiverId');
  };

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h2>Chat with User</h2>
        <p>Online Users: {onlineUsers.join(', ')}</p>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.senderId === socket.id ? 'sent' : 'received'}`}>
            {message.senderId === socket.id ? 'You:' : 'User:'} {message.message}
          </div>
        ))}
        {typing && <div className="typing-indicator">User is typing...</div>}
      </div>
      <div className="chat-input">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleTyping} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;