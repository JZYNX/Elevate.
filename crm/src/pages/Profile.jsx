import React from 'react';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/nikuubg.jpg';
import styled, { keyframes } from 'styled-components';
import { primaryColor, secondaryColor }from '../utils/Color';

const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
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
  /* Add styles for the background image */
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: right;
  z-index: -1; /* Put the image behind other content */
  animation: ${changeColors} 5s infinite linear; /* Apply the animation */
`;

const ProfileTitle = styled.div`
  padding-top: 2rem;
  font-weight: bold; /* Make the title bold */
  padding-left: 10rem;
  h2.profile-header {
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: Bold;
  }
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%; /* Fixed width for the sidebar */
  min-width: 250px; /* Minimum width to prevent squishing */
  background-color: #f0f0f0; /* Adjust as needed */
`;

const ProfileColumns = styled.div`
  overflow: hidden;
  flex: 1; /* Take remaining available space */
  display: flex;
  padding-top: 3rem;
  padding-left: 10rem;
  
  h2.info-header {
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: Bold;
  }

  p.info-text {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: Normal;
  }

  .profile-info {
    flex: 1;
    margin-right: 20px; /* Adjust spacing between columns */
    h2 {
      font-weight: bold; /* Make headings bold */
    }
    p {
      margin: 0; /* Remove default paragraph margins */
    }
  }

  .profile-pic {
    flex: 1; /* Fixed width for the profile pic column */
    align-items: center;
    justify-content: center;
    .button-group {
        display: flex;
        flex-direction: column;
        margin-top: 10px; /* Adjust as needed */
    }

    .profile-button {
        margin-top: 5px; /* Adjust as needed */
        width: 50%;
        background-color: ${primaryColor}; 
        color: white; /* Text color */
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .profile-button:hover {
        background-color: #0056b3; /* Hover color */
    }
  }
`;

function Profile() {
    return (
        <ProfileContainer>
            <SidebarColumn>
                <Sidebar />
            </SidebarColumn>
            <BackgroundImage src={bgImg} alt="bgImg"/>
            <ProfileInfoContainer>
                <ProfileTitle>
                    <h2 className='profile-header'>Profile</h2>
                </ProfileTitle>
                <ProfileColumns>
                    <div className="profile-info">
                        <h2 className="info-header">First Name</h2>
                        <p className="info-text">Evan</p>
                        <h2 className="info-header">Last Name</h2>
                        <p className="info-text">Doe</p>
                        <h2 className="info-header">Email</h2>
                        <p className="info-text">example@email.com</p>
                        <h2 className="info-header">Password</h2>
                        <p className="info-text">********</p>
                        <h2 className="info-header">Contact Number</h2>
                        <p className="info-text">(123) 456-7890</p>
                    </div>
                    <div className="profile-info">
                        <h2 className="info-header">Address</h2>
                        <p className="info-text">123 Main St</p>
                        <h2 className="info-header">City</h2>
                        <p className="info-text">New York</p>
                        <h2 className="info-header">State</h2>
                        <p className="info-text">New York</p>
                    </div>
                    <div className="profile-pic">
                        <h2 className="info-header">Profile Pic</h2>
                        <img src={require("../assets/avatars.jpg").default} alt="altimg" />
                        <div className="button-group">
                            <button className="profile-button">Edit Photo</button>
                            <button className="profile-button">Change Password</button>
                            <button className="profile-button">Edit Profile</button>
                        </div>
                    </div>
                </ProfileColumns>
            </ProfileInfoContainer>
        </ProfileContainer>
    )
}

export default Profile;
