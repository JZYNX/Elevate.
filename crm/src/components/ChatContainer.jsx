import React, {useState, useEffect, useRef} from "react";
import styled, { keyframes } from 'styled-components';
import ChatInput from "./ChatInput";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import bgImg from '../assets/nikuubg.jpg';
import { sendMessageRoute, receiveMessageRoute } from '../utils/APIRoutes';
import { primaryColor, secondaryColor } from '../utils/Color';

// Define a keyframe animation for changing colors
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

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 4rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          font-size: 1.75rem;
        }
      }
    }
  }
  .chat-messages {
    display: flex;
    padding-left: 4rem;
    padding-right: 3rem;
    flex-direction: column;
    gap: 0rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: white;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        margin: 0.1rem;
        font-size: 0.9rem;
        border-radius: 1rem;
        color: white;
        line-height: 1.25;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: ${secondaryColor};
        color: white;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: white;
        color: black;
      }
    }
  }
`;

/**
 * This component represents a chat container that displays messages between users.
 * It handles sending and receiving messages, updating the message list, and scrolling to the latest message.
 * 
 * @component
 * @param {object} currentChat - The current chat or conversation with another user.
 * @param {object} currentUser - The current user.
 * @param {object} socket - The socket object for real-time communication.
 * @returns {JSX.Element} A JSX element representing the chat container.
 */
export default function ChatContainer({ currentChat, currentUser , socket}) {
    // State for incoming messages and messages in the chat
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messages, setMessages] = useState([]);

    // Reference to scroll to the latest message
    const scrollRef = useRef();

    // Fetch messages when the currentChat changes
    useEffect(() => {
        if(currentChat){
            async function fetchData() {
            const response = await axios.post(receiveMessageRoute,{
                from:currentUser._id,
                to:currentChat._id,
            })
            setMessages(response.data);
            }
            fetchData();
        }
    }, [currentChat])
    
    // Handle sending a message
    const handleSendMsg = async (msg) => {
      // Send the message to the server
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        // Emit a socket event to send the message in real-time
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg,
        })
        
        // Update the local message list with the sent message
        const msgs = [...messages];
        msgs.push({fromSelf:true,message:msg});
        setMessages(msgs);
    };

    // Listen for incoming messages using sockets
    useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-receive", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
    }, []);

    // Update the message list when an incoming message arrives
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
      
    // Scroll to the latest message when the message list changes
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);

    // Render the chat container
    return (
    <>
    {currentChat &&(
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>

        </div>
        <div className="chat-messages">
            {
                messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sent":"received"}`}>
                                <div className="content">
                                     <p>
                                     {message.message}
                                     </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <ChatInput handleSendMsg = {handleSendMsg}/>
    </Container>
    )}
    
    </>
    );
}