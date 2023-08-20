import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #BB4BD5;
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
    color: #BB4BD5;
    background-color: white;
    border: none;
    font-size: 16px;
  }

  button.register-button:hover {
    color: #0056b3; 
    cursor: pointer;
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
    background-color: #BB4BD5; 
    color: white; 
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s; 
  }

  button.login-button:hover {
    background-color: #A231BB; 
  }

  button.forget-button{
    color: #BB4BD5;
    background-color: white;
    border: none;
  }

  button.forget-button:hover {
    color: #0056b3; 
    cursor: pointer;
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

const OtherLoginOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
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

  const handleForgotPassword = () => {
    navigate('/dashboard')
  };

  const handleRegister = () => {
    navigate('/dashboard')
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
          <button className="register-button" onClick={handleRegister}>
              Register
          </button>
        </RegisterContainer>
        <input
          className="user-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="forget-button" onClick={handleForgotPassword}>
          Forgot your password?
        </button>
        <input
          className='password-input'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
