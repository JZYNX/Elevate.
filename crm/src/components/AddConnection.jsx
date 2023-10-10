import React, { useState, useEffect, useRef } from 'react';
import ReactSearchBox from "react-search-box";
import styled from 'styled-components';
import Modal from 'react-modal';
import SearchIcon from '@mui/icons-material/Search';
import { primaryColor, secondaryColor } from '../utils/Color';


Modal.setAppElement('#root'); // Set the app root element for accessibility

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  background-color: ${secondaryColor};
  color: white;
  width: 100%;
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
    const data = [
        {
        key: "john",
        value: "John Doe",
        },
        {
        key: "jane",
        value: "Jane Doe",
        },
        {
        key: "mary",
        value: "Mary Phillips",
        },
        {
        key: "robert",
        value: "Robert",
        },
        {
        key: "karius",
        value: "Karius",
        },
    ];

    


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
    const [foundUser, setFoundUser] = useState(null);
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
        setConnections(data);
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };
    

    const handleKeyPress = async (event) => {
      if (event.key === 'Enter') {
        try {
          await findUser(searchInput);
          // setConnections([user]);
          setSearchInput("");
          
        } catch (error) {
          console.error(error);
        }
      }
      
    };
    
  
    const handleAddFriend = async (userBeingAdded) => {
      try {
        if(userBeingAdded===userName){
          alert("Cannot add yourself! Sorry");
        }
        else{
          const response = await fetch('/users/connections', {
            method: 'PATCH', // Use PATCH method as defined in your router
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userName,
              newConnection: userBeingAdded,
            }),
          });
          
          if (response.ok) {
            alert("User Added");
          } else {
            // Handle the error based on the response from your backend
            const errorData = await response.json();
            console.error('Error adding connection:', errorData.error);
          }
        }
      } catch (error) {
        console.error('Network error:', error);
        // Handle any network-related errors, e.g., display an error message to the user.
      }
    };
    
    
    const findUser = async (searchInput) => {
      try {
        // Fetch user data using fetch
        const response = await fetch(`/users/getUser`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({ username: searchInput }),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        setFoundUser(data);
        // console.log("The found user is " + foundUser.username);
        
      } catch (error) {
        setFoundUser(null);
        setSearchInput("");
        fetchAllUsers();
        alert("The user was not found");
        
        
      }
    }

    
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
                        // onChange={handleSearchInputChange}
                        data={data}
                        callback={(record) => console.log(record)}
                        inputHeight="1.5rem"
                        inputBorderColor="hsla(278, 69%, 38%, 0.01)"
                        inputBackgroundColor="hsla(278, 69%, 38%, 0.11)"
                        leftIcon={<SearchIcon fontSize=""/>}
                        iconBoxSize={"1.75rem"}
                    />
                    <input 
                      placeholder='Search'
                      value={searchInput} 
                      onKeyPress = {handleKeyPress}
                      onChange={(e) => setSearchInput(e.target.value)}
                      style={{
                        position: 'absolute',
                        top: '48px',
                        left: '25px',
                        height: "5%",
                        width: "87%",
                        border: '1px solid hsla(278, 69%, 38%, 0.01)',
                        backgroundColor: "hsla(278, 69%, 38%, 0.11)",
                      }}
                    />
                </SearchBoxContainer>
                <SearchResultContainer>
                  <ResultLabel>Recommended Connections</ResultLabel>
                    {foundUser ? (
                      // Display foundUser
                      <ResultContainer key={foundUser._id}>
                        <p>{foundUser.username}</p>
                        <button onClick={() => handleAddFriend(foundUser.username)}> + </button>
                      </ResultContainer>
                    ) : (
                      // Display connections
                      connections.map((connection) => (
                        <ResultContainer key={connection._id}>
                          <p>{connection.username}</p>
                          <button> + </button>
                        </ResultContainer>
                      ))
                    )}
              </SearchResultContainer>

            </ModalWrapper>
        </Modal>
    );
}
