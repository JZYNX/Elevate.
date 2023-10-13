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
import { toast, ToastContainer } from 'react-toastify';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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

const SortOrderContainer = styled.div`
  display: flex;
  background-color: ${secondaryLightColor};
  border-radius: 2rem;
  margin-right: auto;
  margin-left: 5rem;
  padding: 0 .5rem;

  .arrow-icon {
    display: flex;
    margin: auto 0.5rem;
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

const StyledArrowButton = styled(StyledButton)`
  width: 4rem;
  height: 2rem;
  padding: 0;

  .arrow-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
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

const ConnectionsCountContainer = styled.div`
  position: relative;
  margin: auto 0.5rem;
`

const PersonContainer = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

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

const RemoveContainer = styled.div`
  position: relative; 
  left: 50%;
  transform: translateX(-80%);
  color: black;
  &:hover {
    cursor: pointer;
  }
`


function Connections() {
    const urlParams = new URLSearchParams(window.location.search);
    const storedUsername = urlParams.get('username');  
    const [currentSelected, setCurrentSelected] = useState(null);
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [connections, setConnections] = useState([]);
    const [searchedConnections, setSearchConnections] = useState([]);
    const [sortOption, setSortOption] = useState(null);
    const [arrowUp, setArrowUp] = useState(true);
    const [userDates, setUserDates] = useState([]);

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
        await setConnections(data);
        setSearchConnections(data);
        const dates = await fetchUserDates(storedUsername);
        setUserDates(dates);
        // console.log("THe dates is " + userDates);
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
    const profilesToDisplay = searchedConnections.slice(startIndex, endIndex);
  
    // Function to handle next page button click
    const nextPage = () => {
      if (endIndex < searchedConnections.length) {
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

    const handleDeleteFriend = (connection) => {
    
      deleteConnection(connection.username);
    }

    const deleteConnection = async (userToDelete) => {
      try{
        
  
        const payload = {
          username: storedUsername,
          connectionToDelete: userToDelete,
        };
  
        const response = await fetch(`/users/connections/deleteConnection`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchUserConnections();
      } catch (error){
        console.error('Error deleting friend request:', error);
      }
    }


    const handleEnterKeyPress = async (searchValue) => {
        // You can do something with the searchValue here
        if(searchValue!==""){
          await filterConnections(searchValue);
        } else {
          resetConnections();
        }
    };


    const filterConnections = async (searchValue) => {
      const lowerSearchInput = searchValue.toLowerCase();
      console.log(connections);
      const filteredConnections = connections.filter((connection) => {
        const { username, firstName, lastName } = connection;
        return (
          username.toLowerCase().includes(lowerSearchInput) ||
          firstName.toLowerCase().includes(lowerSearchInput) ||
          lastName.toLowerCase().includes(lowerSearchInput)
        );
      });
      // alert(filteredConnections.length);
      if (filteredConnections.length > 0) {
        // If substrings are found, update the connections state
        
        setSearchConnections(filteredConnections);
      } 
    };
  
    const resetConnections = () => {
      setSearchConnections(connections);
    };
    
    const handleSortLastName = () => {
      // Set the sort option to "last-name"
      setSortOption({ value: 'last-name', label: 'Last-name' });
    
      const sortedConnections = [...searchedConnections];
      
      if (arrowUp) {
        // Ascending sort
        sortedConnections.sort((a, b) => a.lastName.localeCompare(b.lastName));
      } else {
        // Descending sort
        sortedConnections.sort((a, b) => b.lastName.localeCompare(a.lastName));
      }
    
      setSearchConnections(sortedConnections);
    };
    
    const handleSortFirstName = () => {
      // Set the sort option to "first-name"
      setSortOption({ value: 'first-name', label: 'First-name' });
    
      const sortedConnections = [...searchedConnections];
      
      if (arrowUp) {
        // Ascending sort
        sortedConnections.sort((a, b) => a.firstName.localeCompare(b.firstName));
      } else {
        // Descending sort
        sortedConnections.sort((a, b) => b.firstName.localeCompare(a.firstName));
      }
    
      setSearchConnections(sortedConnections);
    };
    
    const defaultSort = () => {
      // Set the sort option to null
      setSortOption(null);
      
      const sortedConnections = [...connections];
      
      if (arrowUp) {
        // Keep the existing sort order
      } else {
        // Descending sort
        sortedConnections.reverse();
      }
    
      setSearchConnections(sortedConnections);
    };
    
    const handleMostRecent = () => {
      setSortOption({ value: 'recent', label: 'Most-Recent' });
      if (userDates.length > 0) {
        // Declare sortedConnections before using it
        const sortedConnections = [...searchedConnections].sort((a, b) => {
          const dateA = userDates.find((date) => date.storingConnectionId === a._id);
          const dateB = userDates.find((date) => date.storingConnectionId === b._id);
    
          if (dateA && dateB) {
            // Sort in ascending order if arrowUp is true, descending if false
            const sortOrder = arrowUp ? 1 : -1;
            return sortOrder * (new Date(dateA.date) - new Date(dateB.date));
          } else if (dateA) {
            return -1;
          } else if (dateB) {
            return 1;
          }
          return 0;
        });
    
        setSearchConnections(sortedConnections);
      }
    };
    
    
    
    const fetchUserDates = async (username) => {
      try {
        const response = await fetch(`/users/connections/${username}/getAllDates`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching user dates:', error);
        return [];
      }
    };

    useEffect(() => {
      handleArrowSort();
    }, [arrowUp]);

    const changeArrow = () => {
      setArrowUp(!arrowUp);
    }

    const handleArrowSort = () => {
      if (sortOption && sortOption.value === 'last-name') {
        handleSortLastName();
      } 
      else if (sortOption && sortOption.value === 'first-name') {
        handleSortFirstName();
      } 
      else if (sortOption && sortOption.value === 'recent'){
        handleMostRecent();
      }
      else if(sortOption==null){
        defaultSort();
      }
    }

    return (
      <ConnectionsContainer>
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
          <BackgroundImage src={bgImg} alt="bgImg" />
          <SearchBar 
            onEnterKeyPress={handleEnterKeyPress} 
          />
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
                value={sortOption}
                onChange={(selectedOption) => {
                  if (selectedOption && selectedOption.value === 'last-name') {
                    handleSortLastName();
                  } 
                  if (selectedOption && selectedOption.value === 'first-name') {
                    handleSortFirstName();
                  } 
                  if (selectedOption && selectedOption.value === 'recent'){
                    handleMostRecent();
                  }
                  if(selectedOption==null){
                    defaultSort();
                  }
                  
                }}
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
              <SortOrderContainer>
                <ArrowUpwardIcon
                  className='arrow-icon'
                  onClick={changeArrow}
                  style={{ color: arrowUp ? secondaryColor : 'lightgray', cursor: 'pointer' }}
                />
                <ArrowDownwardIcon
                  className='arrow-icon'
                  onClick={changeArrow}
                  style={{ color: arrowUp ? 'lightgray' : secondaryColor, cursor: 'pointer' }}
                />
              </SortOrderContainer>
              <AddButtonContainer>
                <StyledButton onClick={resetConnections}>Show All Connections</StyledButton>
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
                          <RemoveContainer onClick={() => {
                            //DELETE CONNECTION FROM USER
                            handleDeleteFriend(connection)
                          }}><PersonRemoveIcon /></RemoveContainer>
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
              <ConnectionsCountContainer>
                Showing <strong>{connections.length > 0 ? startIndex + 1 : 0}</strong>-<strong>{connections.length < endIndex ? connections.length : endIndex}</strong> from <strong>{connections.length}</strong> results
              </ConnectionsCountContainer>
              <StyledArrowButton onClick={prevPage} disabled={currentPage === 1}>
                <KeyboardArrowLeftIcon className='arrow-icon'/>
              </StyledArrowButton>
              
              <StyledArrowButton onClick={nextPage} disabled={endIndex >= searchedConnections.length}>
                <KeyboardArrowRightIcon className='arrow-icon'/>
              </StyledArrowButton>
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