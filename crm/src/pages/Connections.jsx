import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import DropDownBox from '../components/DropDown';

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
`;

const DisplayColumn = styled.div`
  flex: 1;
  flex-direction: column;

  .title-container{
	display: flex;
	padding-top: 40px;
	padding-left: 60px;
	padding-right: 20px;
	font-size: 1.25rem;
	font-family: 'Poppins', sans-serif;
  }

`;








function Connections() {
    return (
        <ConnectionsContainer>
            <SidebarColumn>
                <Sidebar/>
            </SidebarColumn>
            <DisplayColumn>
            	<h1>Connections</h1>
				<div className="title-container"><DropDownBox/></div>
				
            </DisplayColumn>
        </ConnectionsContainer>
    )
}

export default Connections