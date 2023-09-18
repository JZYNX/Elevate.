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

const DashboardInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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

  h2.number {
    font-size: 40px; /* Adjust the font size as needed */
    padding-top: 30px;
    margin-bottom: 0;
    font-weight: bold;
    text-align: left;
  }
  p.descriptor {
    font-size: 20px; /* Adjust the font size as needed */
    margin-top: 5px;
    text-align:
  }
`;

// second row of dashboard including events and new connections
const SocialsBox = styled.div`
  display: flex;
  flex: 0.8;
  flex-direction: row;
  margin-left: 10%;
`;
const EventsDisplay = styled.div`
  flex: 1;
  p.descriptor {
    font-size: 18px; /* Adjust the font size as needed */
    font-weight: bold;
    margin-top: 5px;
    text-align:
  }
`;
const ConnectionsDisplay = styled.div`
  flex: 1;
  p.descriptor {
    font-size: 18px; /* Adjust the font size as needed */
    font-weight: bold;
    margin-top: 5px;
    text-align:
  }
`;

// implement notes display and create pop up notes feature
const NotesBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-left: 10%;

  p.descriptor {
    font-size: 18px; /* Adjust the font size as needed */
    font-weight: bold;
    margin-top: 5px;
    text-align:
  }
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <SidebarColumn>
        <Sidebar />
      </SidebarColumn>
      <BackgroundImage src={bgImg} alt="bgImg" />
      
      <DashboardInfo>
        <StatsContainer>
          <StatBox>
            <h2 className="number">150</h2>
            <p className="descriptor">Connections</p>
          </StatBox>
          <StatBox>
            <h2 className="number">12</h2>
            <p className="descriptor">Upcoming Events</p>
          </StatBox>
          <StatBox>
            <h2 className="number">4</h2>
            <p className="descriptor">To-do Tasks</p>
          </StatBox>
        </StatsContainer>
        <SocialsBox>
          <EventsDisplay>
            <p className="descriptor">Upcoming Events</p> 
          </EventsDisplay>
          <ConnectionsDisplay>
            <p className="descriptor">New Connections</p> 
          </ConnectionsDisplay>
        </SocialsBox>
        <NotesBox>
          <p className="descriptor">Notes</p> 
        </NotesBox>
      </DashboardInfo>
    </DashboardContainer>
  );
}

export default Dashboard;
