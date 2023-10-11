import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import bgImg from '../assets/nikuubg.jpg'
import { primaryColor, secondaryColor, secondaryLightColor, secondaryMediumColor } from '../utils/Color'; 
import Select from 'react-select'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Email from '../components/Email';
import AddConnection from '../components/AddConnection';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
  background-color: rgba(0, 0, 0, 0.1);
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%;
  min-width: 250px;
`;

const DisplayColumn = styled.div`
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TitleContainer = styled.h1`
  position: relative;
  left: 3.5rem;
  top: 1rem;
`
const UtilityRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;

  .react-select-container {
    left: 3.5rem;
    width: 15rem;
    height: 2rem; 

    .react-select__control, .react-select__menu, .react-select__option {
      border-radius: 1.25rem;
    }

  }
`

const AddButtonContainer = styled.div`
  margin-right: 3.5rem;
`

const StyledButton = styled.button`
  height: 2.5rem;
  width: 12rem;
  background-color: ${secondaryColor}; 
  font-family: 'Poppins', sans-serif;
  color: white;
  border: none;
  border-radius: 1.25rem;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${primaryColor}; 
  }
`

const ConnectionListContainer = styled.div`
  display: flex;
  height: 75%;
  width: 100%;
  ${'' /* border: 2px dotted red;   */}
  padding: 2rem 3rem;
  flex-wrap: wrap;  
`

const MiniProfile = styled.div`
  ${'' /* border: 2px dotted blue;   */}
  height: 45%;
  width: 19% ;
  background-color: white;
  border-radius: 1rem;
  margin: 0rem 0.5%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`

const Footer = styled.div`
  position: relative;
  display: flex;
  justify-content: right;
  padding-right: 3.5rem;
  bottom: 1rem;  
  
`

const PersonContainer = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  div.profile-name {
    margin-top: 0.5rem;
    font-weight: normal;
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 1rem;
    text-overflow: ellipsis; 
    max-width: 90%;
  }
`

const ProfilePic = styled.img`
  ${'' /* border: 2px dotted red; */}
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 00);
  border: 1px solid rgba(0, 0, 0, 0.5);
  
`

const InfoContainer = styled.div`
  ${'' /* border: 2px dotted blue; */}
  width: 100%;
  height: 10%;
  margin-bottom: 1rem;
  padding: 0 1rem;
  display: flex;
`

const IconContainer = styled.div`
  flex: 0.2;
  color: ${secondaryColor};
  display: grid;
  background-color: ${secondaryLightColor};
  border-radius: 1rem;
  place-items: center;
  cursor: pointer;

  &:hover {
      background-color: ${secondaryMediumColor}
  }
`

const InfoTextContainer = styled.div`
  flex: 0.8;
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis; 
  padding-left: 0.5rem;
`;

function Connections() {
    const urlParams = new URLSearchParams(window.location.search);
    const storedUsername = urlParams.get('username');  
    const [currentSelected, setCurrentSelected] = useState(null);
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [connections, setConnections] = useState([]);
    const sortOptions = [
      { value: 'last-name', label: 'Last-name' },
      { value: 'first-name', label: 'First-name' },
      { value: 'recent', label: 'Most-recent' }
    ]

    const fetchUserConnections = async () => {
      try {
        const response = await fetch(`/users/connections/${storedUsername}/getAllConnection`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };

    useEffect(() => {
      fetchUserConnections();
    }, [storedUsername]);

    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 10; 
  
    // Calculate the indexes of the profiles to display on the current page
    const startIndex = (currentPage - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;
  
    // Get the subset of connections to display on the current page
    const profilesToDisplay = connections.slice(startIndex, endIndex);
  
    // Function to handle next page button click
    const nextPage = () => {
      if (endIndex < connections.length) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Function to handle previous page button click
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const toggleModal = () => {
      setShowEmailPopup(!showEmailPopup);
    }

    const toggleAddModal = () => {
      setShowAddPopup(!showAddPopup);
    }

    return (
      <ConnectionsContainer>
          <BackgroundImage src={bgImg} alt="bgImg" />
          <SearchBar />
          <SidebarColumn>
              <Sidebar userName={storedUsername}/>
          </SidebarColumn>
          <DisplayColumn>
            	<TitleContainer>
                Connections
              </TitleContainer>

              <UtilityRowContainer>
                <Select 
                  options={sortOptions} 
                  isClearable={true}
                  className='react-select-container'
                  classNamePrefix="react-select"
                  placeholder="Sort"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#b6e1f6',
                      primary: secondaryColor,
                    },
                  })}
                />
                <AddButtonContainer>
                  <StyledButton onClick={() => {
                    toggleAddModal()
                  }}
                  > Add Contact </StyledButton>
                </AddButtonContainer>
              </UtilityRowContainer>

              <ConnectionListContainer>
                  {
                    profilesToDisplay.map((connection, index) => {
                      return (
                        <MiniProfile
                          key = {connection._id}
                          className={`contact ${
                            index === currentSelected ? "selected" : ""
                          }`}
                        >
                          <PersonContainer>
                            {connection.userImage? (
                              <ProfilePic src={connection.userImage} alt='profile-img'/>
                            ):(
                              <AccountCircleIcon
                                fontSize="large"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  backgroundColor: 'white',
                                  color: '#5e43b0',
                                  display: 'block', 
                                  margin: '0 0.7rem', 
                                }}
                              />
                            )}
                            <div className='profile-name'>{connection.firstName} {connection.lastName}</div>
                          </PersonContainer>
                          <InfoContainer>
                            <IconContainer><PhoneIcon /></IconContainer>
                            <InfoTextContainer>{connection.contactNumber || 'N/A'}</InfoTextContainer>
                          </InfoContainer>
                          <InfoContainer>
                            <IconContainer onClick={() => {
                                toggleModal();
                              }}><EmailIcon /></IconContainer>
                            <InfoTextContainer>{connection.email}</InfoTextContainer>
                          </InfoContainer>
                        </MiniProfile>
                      )
                    })
                  }
              </ConnectionListContainer>

              <Footer>
                <StyledButton onClick={prevPage} disabled={currentPage === 1}>
                  Previous Page
                </StyledButton>
                
                <StyledButton onClick={nextPage} disabled={endIndex >= connections.length}>
                  Next Page
                </StyledButton>
              </Footer>
            {
              showEmailPopup ? <Email onToggle={toggleModal} showEmailPopup={showEmailPopup}/> : null
            }
            {
              showAddPopup ? <AddConnection onToggle={toggleAddModal} showAddPopup = {showAddPopup} /> : null
            }
          </DisplayColumn>
      </ConnectionsContainer>
    )
}

export default Connections