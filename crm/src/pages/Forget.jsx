import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextHover from '../utils/TextHover';
import styled, { keyframes } from 'styled-components';
import bgImg from '../assets/nikuubg.jpg';
import avatars from '../assets/Avatar.png';
import { primaryColor, secondaryColor } from '../utils/Color';
import { toast, ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const ForgetContainer = styled.div`
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
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  z-index: -1;
  animation: ${changeColors} 5s infinite linear;
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
`;
const ForgetForm = styled.form`
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

  h2.forget-header {
    font-size: 26px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 40px;
    font-weight: Normal;
    letter-spacing: 0.02em;
  }

  input {
    width: 70%;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #ddd;
    border-radius: 20px;
    font-size: 13px;
    outline: none;
  }

  button.reset-button {
    width: 50%;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: ${primaryColor};
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${secondaryColor};
    }
  }
  button.return-button, button.resend-otp {
    color: #0a1172;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    background-color: white;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    padding: 10px;

    &:hover {
      color: #151e3d;
    }
  }
`;
const ForgetMessageContainer = styled.div`
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  padding-left: 70px;
  padding-right: 70px;
  padding-bottom: 10px;
  color: #888;
`;
const ReturnContainer = styled.div`
  font-size: 16px;
  color: #888;

  button.return-button, button.resend-otp {
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

function Forget() {
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '', otp: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const form = useRef();
  const [stepNum, setStepNum] = useState(1);
  const [userOtp, setUserOtp] = useState("");
  const navigate = useNavigate();
  const titleMessage = " elevate.";

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (stepNum === 1) {
      try {
        const matchingUser = await userExists(credentials.email);

        if (matchingUser) {
          const updatedCredentials = {
            ...credentials,
            username: matchingUser.username,
            password: matchingUser.password,
            otp: generateOTP(),
          };
          sendEmail(updatedCredentials);
          setCredentials(updatedCredentials);
          setStepNum(2);
        } else {
          toast.error('User with this email could not be found.');
        }
      } catch (err) {
        console.error('An error occurred:', err);
        toast.error('Password reset failed due to an error. Please try again later.');
      }
    } else if (stepNum === 2) {
      // Update user password in the database or perform the desired action.
      /* Verified OTP */
      if (credentials.otp === userOtp){
        if (newPassword.length < 10 || newPassword.length > 30){
          toast.error("Password must be min 10 characters.");
          return;
        }

        if (newPassword !== confirm) {
          toast.error("Passwords do not match!");
          return;
        }

        const payload = { username: credentials.username, password: newPassword };

        try {
          // Send a PATCH request with the common data
          const response = await axios.patch(`/users/updatePassword`, payload);
      
          if (response.status === 200) {
            // Changes were successfully saved in the backend
            setTimeout(() => {
              navigate('/');
            }, 2000)
            toast.success("Password changed successfully.");
          } else {
            // Handle error if the request was not successful
            toast.error('Failed to save changes to the backend.');
          }
        } catch (error) {
          console.error('Error in axios request:', error);
          // Handle the error as needed
          const errorMessage = error.response?.data?.message || 'An error occurred';
          toast.error(errorMessage);
        }
      } else {
        toast.error("Invalid OTP. Please try again.")
      }
    }
  };

  const userExists = async (email) => {
    try {
      const response = await fetch('/users');

      if (!response.ok) {
        throw new Error("failed to fetch users");
      }

      const users = await response.json();
      const matchingUser = users.find((user) => user.email === email);

      if (matchingUser) {
        return matchingUser;
      }
      return null;
    } catch (err) {
      console.error("Error checking if user exists", err);
      return false;
    }
  };

  const sendEmail = (info) => {
    emailjs
      .send("service_ngmfx3r", "template_crydzix", {
        to_name: info.username || "",
        to_email: info.email || "",
        otp_num: info.otp || "OTP not available right now.",
      }, "m0UYha0uoe8x8bWWK")
      .then((result) => {
        console.log(result.text);
        toast.success("Email sent successfully.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Email sending failed.");
      });
  };

  /* Security measures not in place here
     Sample OTP only */
  const generateOTP = () => {
    const charset = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }

    return otp;
  };

  const resendOtp = () => {
    const updatedCredentials = { ...credentials, otp: generateOTP() };
    sendEmail(updatedCredentials);
    setCredentials(updatedCredentials);
  };

  return (
    <ForgetContainer>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
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

      {stepNum === 1 ? (
        <ForgetForm ref={form} onSubmit={handleResetPassword}>
          <h2 className="forget-header"> <strong>Reset account password</strong></h2>
          <ForgetMessageContainer>
            Enter the email address associated with your account, and we'll send you an OTP to reset your password
          </ForgetMessageContainer>
          <input
            className="user-input"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
          <button type='submit' className="reset-button">
            Send password reset email
          </button>
          <ReturnContainer>
            <button className="return-button" onClick={() => handleNavigation('/')}>
              Back to sign-in
            </button>
          </ReturnContainer>
        </ForgetForm>
        ) : (
          <ForgetForm ref={form} onSubmit={handleResetPassword}>
            <h2 className="forget-header"> <strong>Reset account password</strong></h2>
            <ForgetMessageContainer>
              Enter the OTP and a new password.
            </ForgetMessageContainer>
            <input
              className="user-input"
              type="text"
              placeholder="OTP"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
            />
            <input
              className="user-input"
              type="password"
              placeholder="New Password (min 10 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="user-input"
              type="password"
              placeholder="Confirm New Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button type="submit" className="reset-button">
              Reset Password
            </button>
            <ReturnContainer>
              <button className='resend-otp' onClick={resendOtp}>
                Resend OTP
              </button>
              <button className="return-button" onClick={() => handleNavigation('/')}>
                Back to sign-in
              </button>
            </ReturnContainer>
          </ForgetForm>
      )}
    </ForgetContainer>
  );
}

export default Forget;
