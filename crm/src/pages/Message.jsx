import React, {useState, useEffect, useRef} from "react";
import styled, { keyframes } from 'styled-components';
import bgImg from '../assets/nikuubg.jpg';
import axios from "axios";
import Contacts from "./Contacts";
import Sidebar from '../components/Sidebar';
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";
import {host} from "../utils/APIRoutes"

const changeColors = keyframes`
  0%, 100% {
    filter: hue-rotate(0deg); /* Start and end with pink (320 degrees) */
  }
  50% {
    filter: hue-rotate(60deg); /* Transition to purple (240 degrees) */
  }
`;
const BackgroundImage = styled.img`
  /* Add styles for the background image */
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: right;
  z-index: -1; /* Put the image behind other content */
  animation: ${changeColors} 5s infinite linear; /* Apply the animation */
`;

const SidebarColumn = styled.div`
  flex: 1;
  background-color: #f0f0f0;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: url(${bgImg}); /* Set the background image */
  background-size: cover; /* Ensure the image covers the entire container */
  background-position: right;
  // background-color: #131324;
  .container {
    background-color: rgb(0, 0, 0, 0.3);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 17% 83%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

/**
 * Message component manages user data and chat information.
 */
function Message(){
  // State variables to manage user data and chat information
  const [contacts, setContacts] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const storedUsername = urlParams.get('username');
  const [currentUser,setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();

  /**
   * Fetches user data and contacts data when the currentUser changes.
   */
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
        
        // Parse and set the current user's data
        const loggedInUser = await response.json();
        setCurrentUser(loggedInUser)

        // Fetch contacts data using fetch
        const contactsResponse = await fetch('/users');
        
        if (!contactsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Parse and set the contacts data
        const contactsData = await contactsResponse.json();
        setContacts(contactsData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    // Trigger the data fetching function when the currentUser changes
    fetchData();
  }, [currentUser]);
  
  /**
   * Initializes a socket connection and adds the current user to the chat when currentUser changes.
   */
  useEffect(() => {
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]) 

  // Function to handle changing the current chat
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

export default Message;