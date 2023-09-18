import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/nikuubg.jpg';

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  z-index: -1;
`;

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%;
  min-width: 250px;
  background-color: #f0f0f0;
`;

// stats row on dashboard
const StatsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-left: 10%;
`;
const StatBox = styled.div`
  flex: 1;
  text-align: left;
`;
const Number = styled.h2`
  font-size: 40px; /* Adjust the font size as needed */
  padding-top: 30px;
  margin-bottom: 0;
  font-weight: bold;
`;
const Descriptor = styled.p`
  font-size: 20px; /* Adjust the font size as needed */
  margin-top: 5px;
`;

const EventsContainer = styled.div`

`;


function Dashboard() {
  return (
    <DashboardContainer>
      <SidebarColumn>
        <Sidebar />
      </SidebarColumn>
      <BackgroundImage src={bgImg} alt="bgImg" />
      <StatsContainer>
        <StatBox>
          <Number>150</Number>
          <Descriptor>Connections</Descriptor>
        </StatBox>
        <StatBox>
          <Number>12</Number>
          <Descriptor>Upcoming Events</Descriptor>
        </StatBox>
        <StatBox>
          <Number>4</Number>
          <Descriptor>To-do Tasks</Descriptor>
        </StatBox>
      </StatsContainer>


    </DashboardContainer>
  );
}

export default Dashboard;
