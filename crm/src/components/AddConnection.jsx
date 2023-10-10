import React from 'react';
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
                        placeholder="Search"
                        value="Doe"
                        data={data}
                        callback={(record) => console.log(record)}
                        inputHeight="1.5rem"
                        inputBorderColor="hsla(278, 69%, 38%, 0.01)"
                        inputBackgroundColor="hsla(278, 69%, 38%, 0.11)"
                        leftIcon={<SearchIcon fontSize=""/>}
                        iconBoxSize={"1.75rem"}
                    />
                </SearchBoxContainer>
                <SearchResultContainer>
                    {
                        connections.map((connection, index) => {
                            return (
                                <ResultContainer key = {connection._id}>
                                    <p>{connection.firstName}</p>
                                    <button> + </button>
                                </ResultContainer>
                            )
                        })
                    }
                </SearchResultContainer>
            </ModalWrapper>
        </Modal>
    );
}
