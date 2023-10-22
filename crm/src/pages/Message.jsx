import React, {useState, useEffect, useRef} from "react";
import styled, { keyframes } from 'styled-components';
import bgImg from '../assets/nikuubg.jpg';
import Contacts from "./Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";
import {host} from "../utils/APIRoutes"

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
    background-color: rgb(0, 0, 0, 0.2);
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
        const contactsResponse = await fetch(`/users/connections/${storedUsername}/getAllConnection`);
        
        if (!contactsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Parse and set the contacts data
        const contactsData = await contactsResponse.json();
        console.log("THE RESPONSE IS " + contactsData);
        setContacts(contactsData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    // Trigger the data fetching function when the currentUser changes
    fetchData();
    verifyLogin(storedUsername);
  }, []);
  
  const verifyLogin = async(storedUsername) =>{
    // const navigate = useNavigate();
    // console.log(localStorage);
    console.log(storedUsername);
    const existingUsers = JSON.parse(localStorage.getItem('users'));
    console.log(existingUsers);
    if (existingUsers) {
      // Find the user instance that matches the provided username
      const foundUser = existingUsers.find((user) => user.username === storedUsername);
      

      if (foundUser) {
        const userToCheck = foundUser.username;
        const tokenToCheck = foundUser.token;
        // alert(foundUser)
        const response = await fetch(`/users/verifyLogin`, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userToCheck, tokenToCheck }),
        })
        const responseData = await response.json();
        if(responseData.isLoggedIn === true){
          console.log(foundUser.username, foundUser.token, /* other user data */);
        }
        else{
          alert("not logged in or session expired, please log in and try again!");
          // navigate('/');
        }
        
      } else {
        // No user with the provided username was found
        alert("not logged in or session expired, please log in and try again!");
        //fix here to allow navigate
        // console.log('User not found.');
      }
    } else {
      // No users in localStorage
      alert("not logged in or session expired, please log in and try again!");
    }

  }



  /**
   * Initializes a socket connection and adds the current user to the chat when currentUser changes.
   */
  useEffect(() => {
    async function setSockets(){
      if(currentUser){
        socket.current=io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    }
    setSockets();
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