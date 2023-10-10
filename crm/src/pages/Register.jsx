import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextHover from '../utils/TextHover';
import styled, { keyframes } from 'styled-components';
import bgImg from '../assets/nikuubg.jpg';
import googleIcon from '../assets/google.png';
import fbIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import avatars from "../assets/Avatar.png";
import { primaryColor, secondaryColor }from '../utils/Color';

// Styled components for styling the Register page
const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

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

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 5rem;
  width: 50%;

  div.app-title {
    font-size: 80px;  
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.02em;
    position: absolute;
    top: 5rem;
    left: 9rem;
  }
`;

const Avatars = styled.img`
  width: 100%;
  height: 80%;
  position: relative;
  right: 0rem;
  top: 12rem;
`

const RegisterForm = styled.div`
  width: 60vh;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  color: #333;
  border-radius: 40px;
  margin-right: 3rem;

  h2.login-header {
    font-size: 22px;
    font-family: 'Poppins', sans-serif
    padding: 10px;
    margin-top: 25px;
    margin-bottom: 30px;
    font-weight: Normal;
    letter-spacing: 0.02em;
  }

  // INPUT BOX
  input {
    width: 70%;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #ddd;
    border-radius: 20px;
    font-size: 13px;
    outline: none;
  }

  // LOGIN AND FORGET LOGIN BUTTONS
  button.login-button {
    width: 30%;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 5px;
    background-color: ${primaryColor};
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${secondaryColor};
    }
  }
  button.forget-button {
    color: #0a1172;
    background-color: white;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    padding: 10px;

    &:hover {
      color: #151e3d;
    }
  }

  // SEPARATOR BETWEEN LOGIN AND ALT LOGINS
  .separator-container {
    display: flex;
    margin: 10px 0; 
    width: 67%;
    padding: 5px;
    justify-content: center;
  }
  .separator-line {
    flex-grow: 1;
    height: 0px;
    background-color: black;
  }
  .separator-text {
    margin: 0 10px;
    font-size: 14px;
    white-space: nowrap;
  }

`;

const LoginContainer = styled.div`
  font-size: 16px;
  color: #888;

  button.register-button {
    cursor: pointer;
    color: #0a1172;
    background-color: white;
    border: none;
    font-size: 16px;
    transition: color 0.3s;
    padding-bottom: 10px;
    padding-top: 10px;
    &:hover {
      color: #151e3d;
    }
  }
`;

// ALTERNATIVE LOGIN BUTON STYLING
const IconOnlyButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
const Icon = styled.img`
  width: 32px; /* Adjust the width and height as needed */
  height: 32px;
`;
const OtherOptions = styled.div`
  display: flex;
  align-items: center;
  ${IconOnlyButton} {
    margin:10px;
  }
`;

/**
 * React functional component for the registration page.
 * 
 * This component provides a user interface for users to register a new account.
 * It includes input fields for username, email, password, and password confirmation,
 * as well as buttons for registration and alternative registration options.
 * 
 * @returns {JSX.Element} The JSX markup for the registration page.
 */
function Register() {
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' , confirm: ''});
  const navigate = useNavigate();
  const titleMessage = " elevate.";

  // Handles the registration process when the registration button is clicked.
  const handleRegister = async () => {
    const { username, password, email, confirm } = credentials;
    if (!await userExists(username,email)) {
      postUser(username, password, email, confirm);
    }
  };

  /**
   * Checks if a user with the given username or email already exists.
   * 
   * @param {string} username - The username to check.
   * @param {string} email - The email to check.
   * @returns {boolean} True if a matching username or email is found, false otherwise.
   */
  const userExists = async (username,email) => {
    try{
      const response = await fetch('/users');
      
      if (!response.ok) {
        throw new Error("failed to fetch users");
      }

      const users = await response.json();
      const matchingUser = users.find((user) => user.username === username );
      const matchingEmail = users.find((user) => user.email === email);

      if (matchingUser) {
        alert("Username exists, please use another username.")
        return true;
      } else if (matchingEmail) {
        alert("Email exists, please use another Email.")
        return true;
      }
      return false;

    } catch (err) {
      console.error("Error checking if user exists", err);
      return false;
    }
  };

  /**
   * Sends a POST request to create a new user account.
   * 
   * @param {string} username - The username for the new account.
   * @param {string} password - The password for the new account.
   * @param {string} email - The email for the new account.
   * @param {string} confirm - The password confirmation.
   */
  const postUser = async (username, password,email, confirm) => {
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('/users', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        console.log("User created successfully");
        navigate('/profile');
      } else {
        const errorData = await response.json(); 
        alert(`Failed to create user: ${errorData.message}`);
      }

    } catch (error) {
      console.error("Error creating user", error);
      alert("Error creating user. Please try again.");
    }

  }

  // Handles keypress events, specifically the Enter key, for triggering registration.
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  // Handles navigation to a specific path using the router.
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <RegisterContainer>
      <BackgroundImage src={bgImg} alt="bgImg" />
      <WelcomeMessage>
      <Avatars src={avatars} alt=" " />
        <div className="app-title">
          {titleMessage.split('').map((letter, index) => {
            return (
              <TextHover key={index} shouldAnimate={false}>
               {letter === " " ? '\u00A0' : letter}
              </TextHover>
            );
          })}
        </div>
      </WelcomeMessage>
      <RegisterForm>
        <h2 className="login-header">Welcome to<strong> elevate.</strong></h2>
        <LoginContainer>
          Already have an account?
          <button className="register-button" onClick={() => handleNavigation('/')}>
            Login
          </button>
        </LoginContainer>
        <input
          className="user-input"
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          className="user-email"
          type="text"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          className='password-input'
          type='password'
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          onKeyPress={handleKeyPress}
        />
        <input
          className='password-confirm'
          type='password'
          placeholder="Confirm Password"
          value={credentials.confirm}
          onChange={(e) => setCredentials({ ...credentials, confirm: e.target.value })}
        />
        <button className="login-button" onClick={handleRegister}>
          Sign up
        </button>
        <div className="separator-container">
          <hr className="separator-line" />
          <div className="separator-text">OR</div>
          <hr className="separator-line" />
        </div>
        <OtherOptions>
          <IconOnlyButton>
            <Icon src={googleIcon} alt="Google" />
          </IconOnlyButton>
          <IconOnlyButton>
            <Icon src={fbIcon} alt="Facebook" />
          </IconOnlyButton>
          <IconOnlyButton>
            <Icon src={twitterIcon} alt="Twitter" />
          </IconOnlyButton>
        </OtherOptions>
      </RegisterForm>
    </RegisterContainer>
  );
}

export default Register;

