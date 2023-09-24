import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: rgb(0, 0, 0, 0.4);
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -450px;
        left: 30px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        font-size: 1.1rem;
        color: white;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

/**
 * This component represents the chat input area where users can enter messages.
 * 
 * @component
 * @param {Object} props - The component's props.
 * @param {function} props.handleSendMsg - A callback function to handle sending messages.
 * @returns {JSX.Element} A JSX element representing the chat input area.
 */
export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // Function to show/hide the emoji picker
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Function to handle emoji click
  const handleEmojiClick = (emoji) => {
    // Check if emoji is an object and has a `emoji` property (specific to the emoji-picker-react library)
    if (typeof emoji === 'object' && emoji.hasOwnProperty('emoji')) {
      // If the same emoji is clicked again, accumulate it in the selectedEmoji state
      if (selectedEmoji === emoji.emoji) {
        const updatedMsg = `${msg}${emoji.emoji}`;
        setMsg(updatedMsg);
      } else {
        // If a different emoji is clicked, replace the selectedEmoji state
        setSelectedEmoji(emoji.emoji);
        setMsg((prevMsg) => `${prevMsg}${emoji.emoji}`);
      }
      
      // Handle inserting the emoji into the input field (assumes you have an input element with the ID 'message-input')
      const input = document.getElementById('message-input'); // Replace with your input field's ID
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const currentValue = input.value;
      const newValue = `${currentValue.substring(0, start)}${emoji.emoji}${currentValue.substring(end)}`;
      input.value = newValue;
      input.selectionStart = input.selectionEnd = start + emoji.emoji.length;
      input.focus();
    } else {
      // Handle other scenarios if necessary
    }
  };

  // Function to send the chat message
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
      setSelectedEmoji(null); // Reset selected emoji
    }
  };

  // Render the chat input area
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          id="message-input" // Add an ID to your input field
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

