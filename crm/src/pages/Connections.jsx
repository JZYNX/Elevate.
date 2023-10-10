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

const ConnnectionListContainer = styled.div`
  display: flex;
  height: 80%;
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
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  div.profile-name {
    margin-top: 0.5rem;
    font-weight: normal;
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 1rem;
    text-overflow: ellipsis; 
    max-width: 100%;
  }
`

const ProfilePic = styled.img`
  ${'' /* border: 2px dotted red; */}
  width: 60%;
  height: 60%;
  border-radius: 1rem;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

    const sortOptions = [
      { value: 'last-name', label: 'Last-name' },
      { value: 'first-name', label: 'First-name' },
      { value: 'recent', label: 'Most-recent' }
    ]

    const connections = [
      {
        _id: '1',
        firstName: 'yifan',
        lastName: 'yang',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0404040404',
        email: '120n2d@n092dapwidnaoiwdboawdn09d.com'
      },
      {
        _id: '2',
        firstName: 'sok',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '3',
        firstName: 'trollinh',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '4',
        firstName: 'will',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '5',
        firstName: 'linh',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '6',
        firstName: 'u',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '7',
        firstName: 'Andrew',
        lastName: 'Dasbiboadniopo',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '8',
        firstName: 'he',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '9',
        firstName: 'she',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '10',
        firstName: 'wo',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '11',
        firstName: 'lack',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {
        _id: '12',
        firstName: 'trollin',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      },
      {        
        _id: '13',
        firstName: '2323',
        lastName: 'stinky',
        userImage: 'uploads\nunu.PNG',
        contactNumber: '0dwaob',
        email: '120n2d@oidwbadd.com'
      }
    ]

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
                  <StyledButton> Add Contact </StyledButton>
                </AddButtonContainer>
              </UtilityRowContainer>

              <ConnnectionListContainer>
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
                            {/* Random picture render right now */}
                            <ProfilePic src={bgImg} alt='profile-img'/>
                            <div className='profile-name'>{connection.firstName} {connection.lastName}</div>
                          </PersonContainer>
                          
                          <InfoContainer>
                            <IconContainer><PhoneIcon /></IconContainer>
                            <InfoTextContainer>{connection.contactNumber}</InfoTextContainer>
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
              </ConnnectionListContainer>

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
          </DisplayColumn>
      </ConnectionsContainer>
    )
}

export default Connections