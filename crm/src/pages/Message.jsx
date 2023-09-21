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


// import {PrettyChatWindow } from 'react-chat-engine-pretty'
// const urlParams = new URLSearchParams(window.location.search);

//   // Get the 'username' parameter value from the URL
// const storedUsername = urlParams.get('username');

// const ChatsPage = (props) => {
  
//   return (
//     <div style = {{height:'100vh'}}>
//       <PrettyChatWindow
//         projectId='f9f667d7-4e0a-4460-9608-a7129b2e6e04'
//         username={storedUsername}
//         secret={storedUsername}
//         style={{height:'100%'}}
//         />
//     </div>
//   )
// }

// export default ChatsPage


import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import Contacts from "./Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";
import {host} from "../utils/APIRoutes"
function Message(){
  const [contacts, setContacts] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const storedUsername = urlParams.get('username');
  const [currentUser,setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();


  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data using fetch
        const response = await fetch(`/users/getUser`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({ username: storedUsername }),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const loggedInUser = await response.json();
        setCurrentUser(loggedInUser)

        // Fetch contacts data using fetch
        const contactsResponse = await fetch('/users');
        
        if (!contactsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const contactsData = await contactsResponse.json();
        setContacts(contactsData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, [currentUser]);
  
  useEffect(() => {
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user", currentUser._id);

    }
  }, [currentUser]) 

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser = {currentUser} changeChat={handleChatChange} />
        {
          currentChat === null ?(
          <Welcome currentUser = {currentUser}/>
          ): (
            <ChatContainer currentChat = {currentChat} currentUser = {currentUser} socket={socket}/>
          )

        }
        
      </div>
      
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Message;