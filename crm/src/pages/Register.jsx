import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextHover from '../utils/TextHover';
import styled from 'styled-components';
import bgImg from '../assets/nikuubg.jpg';
import googleIcon from '../assets/google.png';
import fbIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import avatars from "../assets/avatars-removebg-preview.png";

const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  /* Add styles for the background image */
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: right;
  z-index: -1; /* Put the image behind other content */
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex: 1.4;
  flex-direction: row;
  padding-left: 5rem;

  div.app-title {
    font-size: 70px;  
    font-weight: Bold;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.05em;
    position: absolute;
    top: 4rem;
    left: 13rem;
  }
`;

const Avatars = styled.img`
  width: 80%;
  height: 60%;
  position: relative;
  right: 0rem;
  top: 9rem;
`

const RegisterForm = styled.div`
  flex: 1;
  height: 90vh;
  padding: -1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  color: #333;
  margin-right: 15vh;
  border-radius: 25px;

  h2.login-header {
    font-size: 26px;
    margin-bottom: 30px;
    font-weight: Normal;
    letter-spacing: 0.06em;
  }

  // INPUT BOX
  input {
    width: 65%;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
  }

  // LOGIN AND FORGET LOGIN BUTTONS
  button.login-button {
    width: 68%;
    padding: 10px;
    margin: 10px 0;
    background-color: rgba(112, 38, 112, 1);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #151e3d;
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
    margin: 20px 0; 
    width: 67%;
    padding: 10px;
    justify-content: center;
  }
  .separator-line {
    flex-grow: 1;
    height: 0.5px;
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


function Register() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const titleMessage = " elevate.";

  const handleRegister = () => {
    const { username, password } = credentials;
    if (username === 'user' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

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
              <TextHover key={index}>
               {letter === " " ? '\u00A0' : letter}
              </TextHover>
            );
          })}
        </div>
      </WelcomeMessage>
      <RegisterForm>
        <h2 className="login-header"> Welcome to <strong>ELEVATE</strong></h2>
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

