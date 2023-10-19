import React, { useState, useEffect } from 'react';
import ReactSearchBox from "react-search-box";
import styled from 'styled-components';
import Modal from 'react-modal';
import SearchIcon from '@mui/icons-material/Search';
import { primaryColor, secondaryColor } from '../utils/Color';
import { toast } from 'react-toastify';


Modal.setAppElement('#root'); // Set the app root element for accessibility

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  background-color: ${secondaryColor};
  color: white;
  width: 20rem;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  margin: 0;
`;

const SearchBoxContainer = styled.div`
    width: 100%;
    height: 100%;
    top: 1rem;
    right: 3rem;
    z-index: 999;
`

const SearchResultContainer = styled.div`
    width: 100%;
    height: 20rem;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: ${secondaryColor};
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
`

const ResultContainer = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
    justify-content: space-between;

    button {
        background-color: ${secondaryColor}; 
        font-family: 'Poppins', sans-serif;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: background-color 0.3s;
      
        &:hover {
          background-color: ${primaryColor}; 
        }
    }

`

const ResultLabel = styled.p`
    padding: 5px; // Adjust the padding as needed
    font-weight: bold;
    font-size: 0.875rem;
    height: 1rem;
    margin-top: 5px; 
`;

export default function AddConnection({ onToggle, showAddPopup }) {
    const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '0',
    },
    };

    const closeModal = () => {
      onToggle();
    };

    const [searchInput, setSearchInput] = useState(''); 
    const [foundUsers, setFoundUsers] = useState([]);
    const [connections, setConnections] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('username');
    useEffect(() => {
      fetchAllUsers();
    }, []);


    const fetchAllUsers = async () => {
      try {
        const response = await fetch(`/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const modifiedData = data
        .filter(item => item.username !== userName)
        .map(item => ({
          ...item, 
          key: item.username,
          value: item.username 
        }));
        setConnections(modifiedData);
        setFoundUsers(modifiedData);

      } catch (error) {
        toast.error('Error fetching user notes. Please try again later.')
        console.error('Error fetching user notes:', error);
      }
    };  
  
    const handleAddFriend = async (userBeingAdded) => {
      try {
        if(userBeingAdded===userName){
          toast.error("Can't add yourself. xD")
        }
        else{
          const response = await fetch('/users/connections/friendRequest', {
            method: 'PATCH', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userName,
              newConnection: userBeingAdded,
            }),
          });
          
          if (response.ok) {
            toast.success(`Sent connection request to ${userBeingAdded}.`)
          } else {
            // Handle the error based on the response from your backend
            const errorData = await response.json();
            toast.error(`Could not send request to ${userBeingAdded}.`)
            console.error('Error adding connection:', errorData.error);
          }
        }
      } catch (error) {
        console.error('Network error:', error);
        // Handle any network-related errors, e.g., display an error message to the user.
      }
    };

    const updateScreenBySearch = async (searchValue) => {
      if(searchValue!==""){
        await filterConnections(searchValue);
      } else {
        setFoundUsers(connections);
      }
    };

    
    const handleInputChange = (e) => {
      const inputText = e;
      setSearchInput(inputText); 
      updateScreenBySearch(inputText);
    };

    const filterConnections = async (searchValue) => {
      const lowerSearchInput = searchValue.toLowerCase();
      const filteredConnections = connections.filter((connection) => {
        const { username, firstName, lastName } = connection;
        if (username && firstName && lastName) {
          return (
            username.toLowerCase().includes(lowerSearchInput)
          );
        } else {
          return 
        }        
      });
      if (filteredConnections.length > 0) {
        setFoundUsers(filteredConnections);
      } 
    };

    return (
        <Modal
            isOpen={showAddPopup}
            onRequestClose={closeModal}
            contentLabel="Email Modal"
            style={customStyles}
        >
          <ModalWrapper>
              <ModalHeader>
                  Add Connections
                  <CloseButton onClick={closeModal}>X</CloseButton>
              </ModalHeader>

              <SearchBoxContainer>
                  <ReactSearchBox
                      placeholder=""
                      // value={searchInput}
                      onChange={handleInputChange}
                      // data={connections}
                      // onSelect={(e) => {
                      //   console.log(e.item.value);
                      //   updateScreenBySearch(e.item.value);
                      // }}
                      callback={(record) => console.log(record)}
                      inputHeight="1.5rem"
                      inputBorderColor="hsla(278, 69%, 38%, 0.01)"
                      inputBackgroundColor="hsla(278, 69%, 38%, 0.11)"
                      leftIcon={<SearchIcon fontSize=""/>}
                      iconBoxSize={"1.75rem"}
                  />
              </SearchBoxContainer>
              <SearchResultContainer>
                {foundUsers.map((user) => (
                  <ResultContainer key={user._id}>
                    <p>{user.username}</p>
                    <button onClick={() => handleAddFriend(user.username)}> + </button>
                  </ResultContainer>
                ))}
              </SearchResultContainer>

          </ModalWrapper>
        </Modal>
    );
}
