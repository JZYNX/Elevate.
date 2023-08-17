import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Login.css"

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

  return (
    <div className="login-container">
      <h1 className="app-title">CRM Application</h1>
      <div className="login-form">
        <h2 className="login-header">User Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
