import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";


/**
 * Welcome component displays a welcome message and the user's name.
 */
export default function Welcome() {
    const [userName, setUserName] = useState("");
    const [connectionCount, setConnectionCount] = useState(0);

    // Retrieve and set the user's name from the URL query parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const storedUsername = urlParams.get('username');
        setUserName(storedUsername);
    }, []);

    useEffect(() => {
      // Make an API request to fetch the connection count
      if (userName) {
        fetch(`/users/${userName}/connection-count`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setConnectionCount(data.connectionCount);
        })
        .catch((error) => {
          console.error('Error fetching event count:', error);
          // Handle error here
        });
      }
    }, [userName]);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      {
        (connectionCount > 0)   
        ? <h3>Please select a chat to Start messaging.</h3>
        : <h3>You have no connections to message.</h3>
      }
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