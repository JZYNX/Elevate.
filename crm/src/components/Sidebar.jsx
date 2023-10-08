import React, {useState} from 'react';
import styled from 'styled-components';
import {SidebarData} from './SidebarData';
import bgImg from '../assets/nikuubg.jpg';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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


const IconContainer = styled.div`
    flex: 30%;
    display: grid;
    place-items: center;
    color: #0A0072;
`;

const TitleContainer = styled.div`
    flex: 70%;
    flex-direction: row;
    display: flex;
    h3.sidebar-text {
      font-size: 0.9em;
      letter-spacing: 0.01em;
      color: #0A0072;
      font-weight: normal;
    }
`;

const DropDownIconContainer = styled.div`
    color: #0A0072;
    flex: 10%;
`;


const ProfileContainer = styled(ListrowItem)`
  align-items: normal;
  flex-direction: column;
  justify-content: center;
  height: ${props => (props.expanded ? '17vh' : '6.5vh')};
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.3rem;
  height: 6.5vh;
`

const SubProfileContainer = styled.div`
  padding-left: 1.3rem;
  margin-bottom: auto;
`

const SubProfileItem = styled.div`
    font-size: 0.8em;
    letter-spacing: 0.01em;
    color: #0A0072;
    font-weight: normal;
    margin: 0rem 0.5rem 0.5rem 0.5rem;

    &:hover {
      text-decoration: underline;
    }
`

/**
 * Sidebar component for the application.
 * Renders a sidebar with a title and a list of navigation items.
 */
function Sidebar({userName}) {
    const navigate = useNavigate();
    const [showProfileDropDown, setShowProfileDropDown] = useState(false);
    const [isProfileViewMode, setIsProfileViewMode] = useState(true); 

    // Handle navigation to a specific path.
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Handle toggling between view and edit mode for profile
    const handleToggleProfileMode = () => {
      setIsProfileViewMode(!isProfileViewMode);
    };
      
    return (
        <SidebarContainer>
          <SidebarTitle>
            <h2
              className="sidebar-title"
              onClick={() => handleNavigation(`/dashboard?username=${userName}`)}
              style={{ cursor: 'pointer' }}
            >
              <strong>elevate.</strong>
            </h2>
          </SidebarTitle>
          <SidebarList>
            <ProfileContainer
              expanded={showProfileDropDown ? "true" : undefined}
            >
              <ProfileHeader
                onClick={() => {
                  setShowProfileDropDown(!showProfileDropDown);
                }}   
              >
                <IconContainer><AccountCircleIcon/></IconContainer>
                <TitleContainer>
                  <h3 className="sidebar-text">{"Profile"}</h3>
                </TitleContainer>
                <DropDownIconContainer>
                  {
                    showProfileDropDown ? (
                      <KeyboardArrowUpIcon fontSize='' />
                    ) : (<KeyboardArrowDownIcon fontSize='' />)
                  }
                </DropDownIconContainer>
              </ProfileHeader>
              {showProfileDropDown ? (
                <SubProfileContainer>
                  <SubProfileItem 
                    className='view-profile'
                    onClick={() => handleNavigation(`/profile?username=${userName}`)}
                    >View Profile
                  </SubProfileItem>
                  <SubProfileItem 
                    className='edit-profile'
                    onClick={() => handleNavigation(`/profile?username=${userName}`)} 
                    >Edit Profile
                  </SubProfileItem>
                  <SubProfileItem 
                    className='logout'
                    onClick={() => handleNavigation('/')} 
                    >Logout
                  </SubProfileItem>
                </SubProfileContainer>
              ) : null}
            </ProfileContainer>
            {SidebarData(userName).map((val, key) => (
              <React.Fragment key={key}>
                <ListrowItem 
                  onClick={() => {
                    handleNavigation(val.link);
                  }}
                >
                  <IconContainer>{val.icon}</IconContainer>
                  <TitleContainer>
                    <h3 className="sidebar-text">{val.title}</h3>
                  </TitleContainer>
                </ListrowItem>
              </React.Fragment>
            ))}
          </SidebarList>
        </SidebarContainer>
      );
}

export default Sidebar;
