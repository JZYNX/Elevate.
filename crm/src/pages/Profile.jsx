import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/bgimg.jpg';

const BackgroundImage = styled.img`
  /* Add styles for the background image */
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: right;
  z-index: -1; /* Put the image behind other content */
`;

const ProfileContainer = styled.div`
    height: 100vh;
    width: 100vw;
`;

function Profile() {
    return (
        <ProfileContainer>
            <BackgroundImage src={bgImg} alt="bgImg"/>
            <Sidebar/>
        </ProfileContainer>
    )
}

export default Profile;