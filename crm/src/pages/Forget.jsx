import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextHover from '../utils/TextHover';
import styled, { keyframes } from 'styled-components';
import bgImg from '../assets/nikuubg.jpg';
import avatars from "../assets/Avatar.png";
import { primaryColor, secondaryColor } from '../utils/Color';
import { toast, ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser';

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
`
const ForgetForm = styled.div`
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
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
  const [stepNum, setStepNum] = useState(1);
  const [otp, setOtp] = useState(null);
  const [userOtp, setUserOtp] = useState("");
  const navigate = useNavigate();
  const titleMessage = " elevate.";

  const userExists = async (email) => {
    try {
      const response = await fetch('/users');

      if (!response.ok) {
        throw new Error("failed to fetch users");
      }

      const users = await response.json();
      const matchingUser = users.find((user) => user.email === email);

      if (matchingUser) {
        setCredentials({ ...credentials, username: matchingUser.username, password: matchingUser.password });
        return true;
      }
      return false;

    } catch (err) {
      console.error("Error checking if user exists", err);
      return false;
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleResetPassword = async (e) => {
    if (stepNum === 1) {
      userExists(credentials.email)
      .then((foundUser) => {
        if (foundUser) {
          generateOTP();
          sendEmail(e);
          console.log(credentials);
          console.log(otp);
          setStepNum(2);
        } else {
          toast.error('User with this email could not be found.');
        }
      }).catch((err) => {
        console.error('An error occurred:', err);
        toast.error('Password reset failed due to an error. Please try again later.');
      })
    } else if (stepNum === 2) {
      // Update user password in the database or perform the desired action.
      // You can implement this part based on your specific requirements.
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    try {
      const result = emailjs.send("service_ngmfx3r", "template_crydzix", {
        to_name: credentials.username || "",
        to_email: credentials.email || "",
        otp_num: otp || "OTP not available right now.",
      }, "m0UYha0uoe8x8bWWK");
      console.log(result.text);
      toast.success("Email sent successfully.");
    } catch (error) {
      console.error(error.text);
      toast.error("Email sending failed.");
    }
  };

  const generateOTP = () => {
    const charset = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }

    setOtp(otp);
  }

  const resendOtp = (e) => {
    generateOTP();
    sendEmail(e);
  }

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
      {
        stepNum === 1 ? (
          <ForgetForm>
            <h2 className="forget-header"> <strong>Reset account password</strong></h2>
            <ForgetMessageContainer>
              Enter the email address associated with your account and we'll send you an OTP to reset your password
            </ForgetMessageContainer>
            <input
              className="user-input"
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />

            <button className="reset-button" onClick={(e) => handleResetPassword(e)} >
              Send password reset email
            </button>

            <ReturnContainer>
              <button className="return-button" onClick={() => handleNavigation('/')}>
                Back to sign-in
              </button>
            </ReturnContainer>
          </ForgetForm>
        ) : (
          <ForgetForm>
            <h2 className="forget-header"> <strong>Reset account password</strong></h2>
            <ForgetMessageContainer>
              Enter the OTP and a new password.
            </ForgetMessageContainer>
            <input
              className="user-input"
              type="text"
              placeholder="OTP"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value) }
            />

            <button className="reset-button" onClick={(e) => handleResetPassword(e)}>
              Reset Password
            </button>

            <ReturnContainer>
              <button className='resend-otp' onClick={(e) => resendOtp(e)}>
                Resend OTP
              </button>
              <button className="return-button" onClick={() => handleNavigation('/')}>
                Back to sign-in
              </button>
            </ReturnContainer>
          </ForgetForm>
        )
      }
    </ForgetContainer>
  );
}

export default Forget;
