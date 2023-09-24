import React, {useState} from 'react';
import styled from 'styled-components';
import {SidebarData} from './SidebarData';
import bgImg from '../assets/nikuubg.jpg';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SidebarContainer = styled.div`
    height: 100%;
    width: 100%;
    background-image: url(${bgImg});
    background-size: cover;
    background-position: 350px 0px;
`;

const SidebarTitle = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: center;
    align-items: center;
    h2.sidebar-title {
        font-size: 40px;
        font-weight: Normal;
        letter-spacing: 0.00em;
        font-family: 'Poppins', sans-serif;
        color: #0A0072;
    }
`;

const SidebarList = styled.div`
    height: auto;
    padding-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ListrowItem = styled.div`
    width: 85%;
    height: 6.5vh;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    font-family: 'Poppins', sans-serif;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    background-color: white;
    justify-content: center;
    align-items: center;
    margin-top: 0.7em;
    margin-bottom: 0.7em;
    border-radius: 0.8em;
    transition: background-color 0.3s;
    &:hover {
        cursor: pointer;
        background-color: rgba(255,255,255,0.8);
    }
`;

const SettingsListrowItem = styled(ListrowItem)`
    /* Customize the appearance of the cog icon */
    svg {
        font-size: 2rem; /* Adjust the size as needed */
        color: #0A0072; /* Set the color */
        cursor: pointer;
    }
`;

const LogoutListrowItem = styled(ListrowItem)`
    padding-top: 0rem;
    padding-bottom: 0rem;
    margin-left: 0;
    left: 0;
`;

const IconContainer = styled.div`
    flex: 30%;
    display: grid;
    place-items: center;
    color: #0A0072  ;
`;

const TitleContainer = styled.div`
    flex: 70%;
    h3.sidebar-text {
    font-size: 0.9em;
        letter-spacing: 0.01em;
        color: #0A0072;
        font-weight: normal;
    }
`;

/**
 * Sidebar component for the application.
 * Renders a sidebar with a title and a list of navigation items.
 */
function Sidebar() {
    const navigate = useNavigate();
    const [showLogoutOption, setShowLogoutOption] = useState(false);

    // Styles for links in the sidebar
    const linkStyle = {
        textDecoration: 'none', // Remove the underline
        color: 'inherit', // Inherit the text color
      };

    // Handle navigation to a specific path.
    const handleNavigation = (path) => {
        navigate(path);
    };
    
    return (
        <SidebarContainer>
          <SidebarTitle>
            <h2
              className="sidebar-title"
              onClick={() => handleNavigation('/dashboard')}
              style={{ cursor: 'pointer' }}
            >
              <strong>elevate.</strong>
            </h2>
          </SidebarTitle>
          <SidebarList>
            {SidebarData.map((val, key) => {
              return (
                <ListrowItem
                  key={key}
                  onClick={() => {
                    window.location.pathname = val.link;
                  }}
                >
                  <IconContainer>{val.icon}</IconContainer>
                  <TitleContainer>
                    <h3 className="sidebar-text">{val.title}</h3>
                  </TitleContainer>
                </ListrowItem>
              );
            })}
            <SettingsListrowItem
              key="settings"
              onClick={() => setShowLogoutOption(!showLogoutOption)}
            >
              <IconContainer>
                <SettingsIcon /> {/* Use the SettingsIcon here */}
              </IconContainer>
              <TitleContainer>
                <h3 className="sidebar-text">Settings</h3>
              </TitleContainer>
            </SettingsListrowItem>
            {showLogoutOption && (
              <LogoutListrowItem
                key="logout"
                onClick={() => {
                  navigate('/'); // Change '/logout' to the actual logout path
                }}
              >
                <IconContainer>
                  <ExitToAppIcon /> {/* Use the ExitToAppIcon here */}
                </IconContainer>
                <TitleContainer>
                  <h3 className="sidebar-text">Logout</h3>
                </TitleContainer>
              </LogoutListrowItem>
            )}
          </SidebarList>
        </SidebarContainer>
      );
}

export default Sidebar;
