import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/nikuubg.jpg';
import styled, { keyframes } from 'styled-components';
import { primaryColor, secondaryColor } from '../utils/Color';
import axios from 'axios';

const ProfileContainer = styled.div`
  display: flex;
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

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const ProfileTitle = styled.div`
  padding-top: 4rem;
  font-weight: bold;
  padding-left: 10rem;

  h2.profile-header {
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 10px;
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
  padding-right: 20rem;

  h2.info-header {
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: bold;
  }

  input {
    width: 70%;
    padding: 5px;
    border: 1px solid #ddd;
    font-family: 'Poppins', sans-serif;
    border-radius: 5px;
    font-size: 13px;
    outline: none;
  }

  p.info-text {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
  }

  .profile-info {
    flex: 1;
    h2 {
      font-weight: bold;
    }
    p {
      margin: 0;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .profile-button {
      width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: ${secondaryColor};
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
    text-align: center;
    transition: background-color 0.3s ease;
    font-family: 'Poppins', sans-serif;

    &:hover {
      background-color: ${primaryColor};
    }
  }
`;

const ProfileButton = styled.button`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: ${secondaryColor};
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: ${primaryColor};
  }
`;

function Profile() {
  const [isEditMode, setIsEditMode] = useState(false); 
  const [changesSaved, setChangesSaved] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [postImage, setPostImage] = useState( { myFile : ""})

  const createPost = async (newImage) => {
    try{
      await axios.post('users/uploads', newImage)
    }catch(error){
      console.log(error)
    }
  }
  // user info
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('Jsmith1923');
  const [contactNumber, setContactNumber] = useState('0452382938');
  const [address, setAddress] = useState('197 Joy Street');
  const [city, setCity] = useState('Melbourne');
  const [state, setState] = useState('Victoria');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile : base64 })
  };

  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    createPost(postImage);
    setChangesSaved(true);
    setIsEditMode(false);
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
            <input
              type="text"
              placeholder="etc. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : 'input-nonedit-mode'}
            />
            <h2 className="info-header">Last Name</h2>
            <input
              type="text"
              placeholder="etc. Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : ''}
            />
            <h2 className="info-header">Email</h2>
            <input
              type="text"
              placeholder="etc. example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : ''}
            />
            <h2 className="info-header">Password</h2>
            <input
              type="password"
              placeholder="etc. Jsmith1923"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : ''}
            />         
          </div>
          <div className="profile-info">
            <h2 className="info-header">Contact Number</h2>
            <input
              type="text"
              placeholder="etc. 0452382938"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : ''}
            />
            <h2 className="info-header">Address</h2>
            <input
              type="text"
              placeholder="197 Joy Street"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : ''}
            />
            <h2 className="info-header">City</h2>
            <input
              type="text"
              placeholder="etc. Melbourne"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : ''}
            />
            <h2 className="info-header">State</h2>
            <input
              type="text"
              placeholder="etc. Victoria"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={!isEditMode}
              className={isEditMode ? 'input-edit-mode' : ''}
            />
          </div>
          <div className="profile-pic">
            <h2 className="info-header">Profile Pic</h2>
            <ProfilePicContainer>
              <ProfilePicImage src={postImage.myFile} alt="" />
            </ProfilePicContainer>
            <ButtonGroup>
              {isEditMode ? (
                <label className="profile-button">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              ) : null}
              {isEditMode ? (
                <>
                  <ProfileButton>Change Password</ProfileButton>
                  <ProfileButton onClick={handleSaveChanges}>
                    Save Changes
                  </ProfileButton>
                </>
              ) : (
                <ProfileButton onClick={toggleEditMode}>Edit Profile</ProfileButton>
              )}
            </ButtonGroup>
          </div>
        </ProfileColumns>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
export default Profile;
