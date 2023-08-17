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

  const handleForgotPassword = () => {
    // Replace with your forgot password logic or route
    alert('Forgot your password?');
  };

  const handleRegister = () => {
    // Replace with your registration logic or route
    alert('Register');
  };

  return (
    <div className="login-container">
      <div className="graphic-section">
        <h1 className="app-title">Welcome</h1>
        {/* Additional content, such as a graphic */}
      </div>
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
          <button className="login-button" onClick={handleLogin}>Login</button>
          <div className="login-links">
            <a href="#" onClick={handleForgotPassword}>Forgot your password?</a>
            <span> | </span>
            <a href="#" onClick={handleRegister}>Register</a>
          </div>
      </div>
    </div>
  );
}

export default Login;
