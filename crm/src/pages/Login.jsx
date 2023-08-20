import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  // background-color: #bb4bd5;
  background-image: url("../blue.jpg");
  color: white;
`;

const GraphicSection = styled.div`
  flex: 1.5;
  padding: 20px;
`;

const RegisterContainer = styled.div`
  font-size: 16px;
  color: #888;

  button.register-button {
    cursor: pointer;
    color: #bb4bd5;
    background-color: white;
    border: none;
    font-size: 16px;
    transition: color 0.3s;

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

  button.login-button {
    width: 50%;
    padding: 10px;
    margin: 10px 0;
    background-color: #bb4bd5;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #a231bb;
    }
  }

  button.forget-button {
    color: #bb4bd5;
    background-color: white;
    border: none;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }
`;

const LineBreak = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  span {
    font-size: 18px;
    background-color: #f3f5f6;
    padding: 0 10px;
  }
`;

const OtherLoginOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 5px;
    padding: 10px;
    background-color: #bb4bd5;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #a231bb;
    }
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
      <GraphicSection>
        <h1 className="app-title">Welcome</h1>
      </GraphicSection>
      <LoginForm>
        <h2 className="login-header">User Login</h2>
        <RegisterContainer>
          Don't have an account yet? 
          <button className="register-button" onClick={() => handleNavigation('/dashboard')}>
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
        <button className="forget-button" onClick={() => handleNavigation('/dashboard')}>
          Forgot your password?
        </button>
        <input
          className="password-input"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          onKeyPress={handleKeyPress}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <OtherLoginOptions>
          <LineBreak>
            <span>or login with</span>
          </LineBreak>
          <div>
            <button>Login with Google</button>
            <button>Login with Apple ID</button>
          </div>
        </OtherLoginOptions>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;

