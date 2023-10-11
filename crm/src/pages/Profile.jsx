import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../components/Sidebar';
import chemImg from '../assets/bgimg.jpg';
import { primaryColor, secondaryColor } from '../utils/Color';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`

const SidebarColumn = styled.div`
  flex: 0 0 15%;
  min-width: 250px;
  background-color: #f0f0f0;
`;

const ProfileBannerContainer = styled.div`
  flex: 1;
  position: relative;
`;

const ProfileBanner = styled.img`
  width: 100%;
  height: 30%; 
  background-color: rgba(25, 255, 255, .4);
  object-fit: cover;
  z-index: -1;
`;

const ProfilePicContainer = styled.div`
  position: absolute;
  top: 20%; 
  left: 50%;
  transform: translateX(-50%);
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  border: none;
  overflow: hidden;
  z-index: 1; 
`;

const ProfilePicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfoContainer = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: black;
  font-family: 'Poppins', sans-serif;
  max-width: 300px; /* Adjust the max-width as needed */
`;

const UserInfoItem = styled.div`
  margin: 5px;
  font-size: 16px;
  line-height: 1.5;
`;

function Profile() {
  const [selectedImagePath, setSelectedImagePath] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    city: '',
    state: '',
  });

  // Create a URLSearchParams object to parse the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Get the 'username' parameter value from the URL
  const storedUsername = urlParams.get('username');

  // Fetch user data and set it in the component state.
  useEffect(() => {
    async function fetchUserDataAndSetState() {
      try {
        const userResponse = await fetchUserData(storedUsername);
        setUserData(userResponse);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserDataAndSetState();
  }, [storedUsername]);

  return (
    <Container>
      <SidebarColumn>
        <Sidebar userName={storedUsername} />
      </SidebarColumn>

      <ProfileBannerContainer>
        <ProfileBanner src={chemImg} alt="img" />
        <ProfilePicContainer>
          <ProfilePicImage src={userData.userImage ? '/' + userData.userImage : ''} alt="" />
        </ProfilePicContainer>
      </ProfileBannerContainer>

      <UserInfoContainer>
        <UserInfoItem>
          <strong>First Name:</strong> {userData.firstName || ''}
        </UserInfoItem>
        <UserInfoItem>
          <strong>Last Name:</strong> {userData.lastName || ''}
        </UserInfoItem>
        <UserInfoItem>
          <strong>Email:</strong> {userData.email || ''}
        </UserInfoItem>
        <UserInfoItem>
          <strong>Contact Number:</strong> {userData.contactNumber || ''}
        </UserInfoItem>
        <UserInfoItem>
          <strong>Address:</strong> {userData.address.street || ''}
        </UserInfoItem>
        <UserInfoItem>
          <strong>City:</strong> {userData.address.city || ''}
        </UserInfoItem>
        <UserInfoItem>
          <strong>State:</strong> {userData.address.state || ''}
        </UserInfoItem>
      </UserInfoContainer>
    </Container>
  );
}

/**
 * Fetch user data based on the provided username.
 * @param {string} username - The username of the user.
 * @returns {Promise<Object>} A promise that resolves to user data.
 * @throws {Error} If there is an error fetching user data.
 */
const fetchUserData = async (username) => {
  try {
    const response = await fetch(`/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const allUserData = await response.json();

    // Filter the user data to find the matching username
    const userData = allUserData.find(user => user.username === username);

    if (!userData) {
      throw new Error(`User with username "${username}" not found`);
    }

    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Handle the error as needed
  }
};

export default Profile;
