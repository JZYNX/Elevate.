import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  z-index: -1;
`;

const ConnectionsContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%;
  min-width: 250px;
  background-color: #f0f0f0;
`;


function Connections() {
  const urlParams = new URLSearchParams(window.location.search);
  const storedUsername = urlParams.get('username');

  return (
        <ConnectionsContainer>
            <SidebarColumn>
                <Sidebar userName={storedUsername}/>
            </SidebarColumn>
            <h1>Connections</h1>
        </ConnectionsContainer>
    )
}

export default Connections