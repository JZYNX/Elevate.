import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgImg from '../assets/bgimg.jpg';

const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: white;
`;

const BackgroundImage = styled.img`
  /* Add styles for the background image */
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: right;
  z-index: -1; /* Put the image behind other content */
`;

const GraphicSection = styled.div`
  flex: 1.5;
  padding: 20px;
`;

const LoginContainer = styled.div`
  font-size: 16px;
  color: #888;
  
  button.login-button {  
    cursor: pointer;
    color: #0a1172;
    background-color: white;
    border: none;
    font-size: 16px;
  }

  button.login-button:hover {
    color: #0056b3; 
    cursor: pointer;
  }
`;

const RegisterForm = styled.div`
  flex: 1;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #ffffff; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  color: #333; 
  margin-right: 10vh;

  h2.register-header {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  input {
    width: 65%;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #ddd; 
    border-radius: 4px;
    font-size: 16px;
    outline: none;
  }

  button.register-button {
    width: 50%;
    padding: 10px;
    margin: 10px 0;
    background-color: #0a1172; 
    color: white; 
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s; 
  }

  button.register-button:hover {
    background-color: #151e3d; 
  }

`

const LineBreak = styled.div`
  width: 100%;
  height: 20px; 
  border-bottom: 1px solid black; 
  text-align: center">

  span {
    font-size: 40px; 
    background-color: #F3F5F6; 
    padding: 0 10px;
  } 
`;

const OtherOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = () => {
    if (username === 'user' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    navigate('/')
  };


  return (
    <RegisterContainer>
      <BackgroundImage src={bgImg} alt="bgImg" />
      <GraphicSection>
        <h1 className="app-title">Welcome</h1>
      </GraphicSection>
      <RegisterForm>
        <h2 className="register-header">Create Account</h2>
        <LoginContainer>
          Already have an account?
          <button className="login-button" onClick={handleLogin}>
              Login
          </button>
        </LoginContainer>
        <input
          className="user-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='password-input'
          type='password'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="register-button" onClick={handleRegister}>
          Sign Up
        </button>

      <OtherOptions>
        <LineBreak>
          <span>or register with</span>
        </LineBreak>
        <div>
          <button>Login with Google</button>
          <button>Login with Apple ID</button>
        </div>
      </OtherOptions>
      </RegisterForm>
    </RegisterContainer>
  );
}

export default Login;
