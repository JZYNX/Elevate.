import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/nikuubg.jpg';
import styled, { keyframes } from 'styled-components';
import { primaryColor, secondaryColor } from '../utils/Color';

const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  z-index: -1;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const changeColors = keyframes`
  0%, 100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(60deg);
  }
`;

const ProfileTitle = styled.div`
  padding-top: 2rem;
  font-weight: bold;
  padding-left: 10rem;

  h2.profile-header {
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: bold;
  }
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%;
  min-width: 250px;
  background-color: #f0f0f0;
`;

const ProfileColumns = styled.div`
  overflow: hidden;
  flex: 1;
  display: flex;
  padding-top: 3rem;
  padding-left: 10rem;

  h2.info-header {
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: bold;
  }

  p.info-text {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: normal;
  }

  .profile-info {
    flex: 1;
    margin-right: 20px;
    h2 {
      font-weight: bold;
    }
    p {
      margin: 0;
    }
  }

  .profile-pic {
    flex: 1;

    .button-group {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }

    .profile-button {
      width: 40%; /* Set a consistent width for all buttons */
      margin-top: 5px; /* Adjust margin as needed */
      background-color: ${primaryColor};
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 14px;
      border-radius: 5px;
      text-align: center;
      transition: background-color 0.3s ease;
    }
      
    .profile-button:hover {
    background-color: ${secondaryColor};
    }
  }
`;

const ProfilePicContainer = styled.div`
  width: 150px; 
  height: 150px; 
  border-radius: 50%; 
  border: 1px solid #ddd;
  overflow: hidden;
`;

const ProfilePicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedImage(URL.createObjectURL(file)); // Create a preview URL for the image
  };

  return (
    <ProfileContainer>
      <SidebarColumn>
        <Sidebar />
      </SidebarColumn>
      <BackgroundImage src={bgImg} alt="bgImg" />
      <ProfileInfoContainer>
        <ProfileTitle>
          <h2 className="profile-header">Profile</h2>
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
            <ProfilePicContainer>
              <ProfilePicImage src={selectedImage} alt="" />
            </ProfilePicContainer>
            <div className="button-group">
                <label className="profile-button">
                Upload Photo
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
                </label>
                <button className="profile-button">Change Password</button>
                <button className="profile-button">Edit Profile</button>
            </div>
          </div>
        </ProfileColumns>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}

export default Profile;
