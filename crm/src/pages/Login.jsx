import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextHover from '../utils/TextHover';
import styled, { keyframes } from 'styled-components';
import bgImg from '../assets/nikuubg.jpg';
import googleIcon from '../assets/google.png';
import fbIcon from '../assets/facebook.png';
import linkedinIcon from '../assets/linkedin.png';
import avatars from "../assets/Avatar.png";
import { primaryColor, secondaryColor }from '../utils/Color';
import { toast, ToastContainer } from 'react-toastify';
import { gapi } from "gapi-script";
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

const LoginContainer = styled.div`
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
    filter: hue-rotate(30deg); /* Transition to purple (240 degrees) */
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

const LoginForm = styled.div`
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
    font-size: 26px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 40px;
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
    margin-top: 20px;
    background-color: ${primaryColor};
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
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
    margin-top: 20px;
    margin-bottom: 5px;
    width: 67%;
    padding: 10px;
    justify-content: center;
  }
  .separator-line {
    flex-grow: 1;
    height: 0px;
    background-color: black;
  }
  .separator-text {
    margin: 0 10px;
    font-size: 13px;
    white-space: nowrap;
  }

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
    padding-bottom: 20px;

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
const OtherLoginOptions = styled.div`
  display: flex;
  align-items: center;
  ${IconOnlyButton} {
    margin:10px;
  }
`;


/**
 * Login Component
 * 
 * This component represents the login page of the application.
 * 
 * @component
 * @returns {JSX.Element} A JSX element representing the login page.
 */
function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const titleMessage = " elevate.";
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // 7 days from now=

  // Function to handle user login
  const handleLogin = async () => {
    const { username, password } = credentials;
    console.log(process.env.PORT);
    userExists(username, password)
    .then((userExists) => {
      if (userExists) {
        const profileURL = `/dashboard?username=${username}`;
        window.location.href = profileURL;
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      toast.error('Login failed due to an error. Please try again later.');
    });
  };

   // Function to handle Enter key press for login
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  // Function to handle navigation to other pages
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { tokenId } = response;
    // Send this tokenId to your server for validation, or handle the user login as needed.
    // You can navigate to the dashboard or perform other actions here.
    console.log(response);
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: "718066585548-9c25n26k4ci4do8f3mh45stub0s4de0u.apps.googleusercontent.com",
        plugin_name: "chat",
      });
    });
    if (await userExists(response.profileObj.googleId, "123123123123")){
      navigate(`/dashboard?username=${response.profileObj.googleId}`);
    } else {
      postUser(response.profileObj.googleId, "123123123123", response.profileObj.email)
      navigate(`/dashboard?username=${response.profileObj.googleId}`);
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
          toast.error("Username exists, please use another username.")
          return true;
        } else if (matchingEmail) {
          toast.error("Email exists, please use another Email.")
          return true;
        }
        return false;
  
      } catch (err) {
        console.error("Error checking if user exists", err);
        return false;
      }
    };

  const postUser = async (username, password, email) => {
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
        toast.success("User created successfully.");
      } else {
        const errorData = await response.json(); 
        toast.error(`Failed to create user: ${errorData.message}`);
      }

    } catch (error) {
      console.error("Error creating user", error);
      alert("Error creating user. Please try again.");
    }
  }

  
  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed', error);
    // Handle the failure, show an error message, or perform other actions.
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: 'Linkedin API is temporarily unavailable. Please try again later.',
    redirectUri: 'http://localhost:3000/linkedin',
    onSuccess: (code) => {
      // Change from `data.code` to `code`
      console.log(code);
    },
    // Change from `onFailure` to `onError`
    onError: (error) => {
      console.log(error);
    },
  });

  // Render the login page
  return (
    <LoginContainer>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
      <BackgroundImage src={bgImg} alt="bgImg" />
      <WelcomeMessage>
        <Avatars src={avatars} alt=" " />
        <div className="app-title">
          {titleMessage.split('').map((letter, index) => {
            return (
              <TextHover key={index} shouldAnimate={true}>
               {letter === " " ? '\u00A0' : letter}
              </TextHover>
            );
          })}
        </div>
      </WelcomeMessage>
      <LoginForm>
        <h2 className="login-header"> <strong>Login</strong></h2>
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
         <button className="forget-button" onClick={() => handleNavigation('/forget')}>
          Forgot your password?
        </button>
        <button className="login-button" onClick={handleLogin}>
          Log in
        </button>
        <div className="separator-container">
          <hr className="separator-line" />
          <div className="separator-text">OR</div>
          <hr className="separator-line" />
        </div>
        <OtherLoginOptions>
          {/* <GoogleLogin
            clientId="718066585548-9c25n26k4ci4do8f3mh45stub0s4de0u.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            render={renderProps => (
              <IconOnlyButton>
                <Icon src={googleIcon} alt="Google" onClick={renderProps.onClick}/>
              </IconOnlyButton>
            )}
          /> */}
          <IconOnlyButton>
              <Icon src={googleIcon} alt="Google"/>
            </IconOnlyButton>
          <IconOnlyButton>
            <Icon src={fbIcon} alt="Facebook" />
          </IconOnlyButton>
          <IconOnlyButton>
            <Icon src={linkedinIcon} alt="Linkedin" onClick = {linkedInLogin}/>
          </IconOnlyButton>
        </OtherLoginOptions>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;

