import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";


/**
 * Welcome component displays a welcome message and the user's name.
 */
export default function Welcome() {
    const [userName, setUserName] = useState("");

    // Retrieve and set the user's name from the URL query parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const storedUsername = urlParams.get('username');
        setUserName(storedUsername);
    }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;