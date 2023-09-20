// import React, { useState } from 'react';

// function Message() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleSendMessage = () => {
//     if (message.trim() !== '') {
//       setMessages([...messages, { text: message, sender: 'user' }]);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="message-container">
//       <h2>Messaging</h2>
//       <div className="message-list">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default Message;


import {PrettyChatWindow } from 'react-chat-engine-pretty'
const urlParams = new URLSearchParams(window.location.search);

  // Get the 'username' parameter value from the URL
const storedUsername = urlParams.get('username');

const ChatsPage = (props) => {
  
  return (
    <div style = {{height:'100vh'}}>
      <PrettyChatWindow
        projectId='f9f667d7-4e0a-4460-9608-a7129b2e6e04'
        username={storedUsername}
        secret={storedUsername}
        style={{height:'100%'}}
        />
    </div>
  )
}

export default ChatsPage