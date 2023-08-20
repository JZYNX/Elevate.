import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgImg from '../assets/bgimg.jpg';
import googleIcon from '../assets/google.png';
import fbIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
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

const WelcomeMessage = styled.div`
  flex: 1.5;
  padding: 20px;
`;

const RegisterContainer = styled.div`
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
      color: #0056b3;
    }
  }
`;

const LoginForm = styled.div`
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

  h2.login-header {
    font-size: 28px;
    margin-bottom: 30px;
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

  button.login-button {
    width: 68%;
    padding: 10px;
    margin: 10px 0;
    background-color: #0a1172;
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

    &:hover {
      color: #0056b3;
    }
  }
`;

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

const OtherLoginOptions = styled.div`
  display: flex;
  align-items: center;
  ${IconOnlyButton} {
    margin:10px;
  }
`;


function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = () => {
    const { username, password } = credentials;
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <LoginContainer>
      <BackgroundImage src={bgImg} alt="bgImg" />
      <WelcomeMessage>
        <h1 className="app-title">Welcome</h1>
      </WelcomeMessage>
      <LoginForm>
        <h2 className="login-header">LOG IN TO VALORANT</h2>
        <RegisterContainer>
          Don't have an account yet? 
          <button className="register-button" onClick={() => handleNavigation('/register')}>
            Register
          </button>
        </RegisterContainer>
        <input
          className="user-input"
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          className='password-input'
          type='password'
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          onKeyPress={handleKeyPress}
        />
         <button className="forget-button" >
          Forgot your password?
        </button>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <OtherLoginOptions>
          <IconOnlyButton>
            <Icon src={googleIcon} alt="Google" />
          </IconOnlyButton>
          <IconOnlyButton>
            <Icon src={fbIcon} alt="Facebook" />
          </IconOnlyButton>
          <IconOnlyButton>
            <Icon src={twitterIcon} alt="Twitter" />
          </IconOnlyButton>
        </OtherLoginOptions>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;

