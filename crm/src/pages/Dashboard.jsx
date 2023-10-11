import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../components/Sidebar';
import { primaryColor, secondaryColor } from '../utils/Color';
import { toast, ToastContainer } from 'react-toastify';
import bgImg from '../assets/nikuubg.jpg';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../components/SearchBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const changeColors = keyframes`
  0%, 100% {
    filter: hue-rotate(0deg); /* Start and end with pink (320 degrees) */
  }
  50% {
    filter: hue-rotate(30deg); /* Transition to purple (240 degrees) */
  }
`;

const BackgroundImage = styled.img`
  /* Add styles for the background image */
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  z-index: -2; /* Put the image behind other content */
  animation: ${changeColors} 5s infinite linear; /* Apply the animation */
`;

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
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
  background-color: rgba(0, 0, 0, 0.1);
`;
// stats row on dashboard
const StatsContainer = styled.div`
  padding-top: 3rem;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;
const StatBox = styled.div`
  text-align: left;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 0.5rem;
  padding-left: 2rem;
  margin: 0 0.25rem;
  height: 100%;
  width: 100%;

  h2.number {
    font-size: 36px;
    font-weight: bold;
    margin: 0rem;
  }
  p.descriptor {
    margin: 0;
    font-size: 18px;
  }
`;
// second row of dashboard including events and new connections
const SocialsBox = styled.div`
  display: flex;
  flex: 1;
  height: 30%;
  width: 95%;
  margin: 1rem auto 0rem;
  flex-direction: row;  
`;
const EventConnectionDisplay = styled.div`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  margin: 0rem 0.25rem;
  height: 100%;
  width: 100%;
  p.descriptor {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 0.313rem;
  }
`;

const ContentContainer = styled.div`
  height: 90%;
  overflow-y: auto; /* Add vertical scrollbar when content overflows */
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: ${secondaryColor};
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`

const EventListContainer = styled.div`
  max-height:1000px; /* Set a max height for the event list container */
`;
const DateBox = styled.div`
  background-color: rgba(94, 67, 176, 0.9);
  border-radius: 0.5rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 95%; /* Make it fill horizontally */
`;

// incoming connections second row display
const IncomingConnection = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  width: 95%;
  padding-left: 3rem;
  padding-right: 3rem;

  p.connection-username {
    width: 90%;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  button {
    border: none; 
    background-color: rgba(255, 255, 255, 0);
    &:hover {
      cursor: pointer;
    }
  }
`

// implement notes display and create pop up notes feature
const NotesBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 16rem;
  padding: 0.5rem;
  width: 95%;
  margin: 1rem auto;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
`;
const NotesHeader = styled.div`
  display: flex;
  flex: 0.3;

  p.descriptor {
    font-size: 1.5rem;
    font-weight: bold;
    padding-left: 2rem;
  }

  button {
    height: 2.5rem;
    width: 8rem;
    background-color: ${secondaryColor}; /* Use your desired button color */
    font-family: 'Poppins', sans-serif;
    color: white;
    border: none;
    border-radius: 1.25rem;
    padding: 0.625rem 1.25rem;
    margin-left: auto;
    margin-right: 2rem;
    margin-top: 1.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${primaryColor}; /* Use a darker color for hover effect */
    }
  }
`;
const NotesList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
  padding: 0 2rem;
  overflow-y: auto;

  .note-item {
    display: flex;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1rem;
    width: 45rem;
    margin: 0.4rem 0rem;
    padding-left: 2rem;

    p.note-title {
      font-size: 0.9rem;
      &:hover {
        cursor: pointer;
      }
    }
    button {
      border: none;
      margin: auto 2rem auto auto;
      background-color: rgba(255, 255, 255, 0);

      &:hover {
        cursor: pointer;
      }
    }
  }
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: ${secondaryColor};
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;
const NotesPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 85%;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  button {
    background-color: ${secondaryColor};
    width: 50%;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 1rem 2rem;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    transition: background-color 0.3s;
    &:hover {
      background-color: ${primaryColor};
    }
  }
`;
const StyledInput = styled.input`
  font-family: 'Poppins', sans-serif;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 18px;
  resize: vertical;
  width: calc(100% - 4rem);

  &:focus {
    border: 1px solid black;
  }

`;
const StyledTextArea = styled.textarea`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  resize: vertical;
  width: calc(100% - 4rem);

  &:focus {
    border: 1px solid black;
    outline: none;
  }
`;

function Dashboard() {
  const [showNotesPopup, setShowNotesPopup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newNoteID, setNewNoteID] = useState('');
  const [userName, setUserName] = useState('');
  const [eventCount, setEventCount] = useState(0);
  const [userEvents, setUserEvents] = useState([]);
  const [connectionCount, setConnectionCount] = useState(0);
  const [groupedUserEvents, setGroupedUserEvents] = useState([]);
  const [incomingConnections, setIncomingConnections] = useState([{username: "Jason"}]);  // Sample connection. use []
  const currentDate = new Date(); // Get the current date and time

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const storedUsername = urlParams.get('username');
    setUserName(storedUsername);
  }, []);

  useEffect(() => {
    // Make an API request to fetch the event count
    fetch(`/users/${userName}/event-count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEventCount(data.eventCount);
      })
      .catch((error) => {
        console.error('Error fetching event count:', error);
        // Handle error here
      });
  }, [userName]);
  
  useEffect(() => {
    // Make an API request to fetch the connection count
    fetch(`/users/${userName}/connection-count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setConnectionCount(data.connectionCount);
      })
      .catch((error) => {
        console.error('Error fetching event count:', error);
        // Handle error here
      });
  }, [userName]);


  useEffect(() => {
    // Make an API request to fetch the user events
    fetch(`/users/${userName}/userEvents`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserEvents(data.userEvents);
        // Group events by start date
        const eventsByDate = {};

        data.userEvents.forEach((event) => {
          const eventStartDate = event.start.split('T')[0];
          const eventStartDateObj = new Date(event.start);
    
          // Check if the event is in the future
          if (eventStartDateObj > currentDate) {
            if (!eventsByDate[eventStartDate]) {
              eventsByDate[eventStartDate] = [];
            }
            eventsByDate[eventStartDate].push(event);
          }
        });
    
        // Sort the grouped events by start date
        const sortedEventLists = Object.values(eventsByDate).sort((a, b) => {
          const dateA = new Date(a[0].start);
          const dateB = new Date(b[0].start);
          return dateA - dateB;
        });
    
        setGroupedUserEvents(sortedEventLists);
      })
      
      .catch((error) => {
        console.error('Error fetching event count:', error);
        // Handle error here
      });
  }, [userName]);

  const fetchUserNotes = async () => {
    try {
      const response = await fetch(`/users/${userName}/getNotes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching user notes:', error);
    }
  };

  useEffect(() => {
    if (userName) {
      fetchUserNotes();
    }
  }, [userName]);
  
  const handleAddNote = async () => {
    if (newTitle && newNote) {
      if (showNotesPopup !== null) {
        // const updatedNotes = [...notes];
        if (showNotesPopup >= 0 && showNotesPopup < notes.length) {
          // Editing an existing note
          const payload = {
            id: newNoteID,
            title: newTitle, // The updated title
            content: newNote, // The updated content
          };
          try {
            const response = await fetch(`/users/${userName}/updateNote`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify( payload ),
            });
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          fetchUserNotes();
          // const data = await response.json();
          // updatedNotes.push({ title: newTitle, note: newNote });
          } catch (error) {
            console.error('Error creating note:', error);
          }
        } else {
          // Adding a new note
          try {
            const response = await fetch(`/users/${userName}/notes`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title: newTitle, content: newNote }),
            });
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          fetchUserNotes();
          // const data = await response.json();
          // updatedNotes.push({ title: newTitle, note: newNote });
          } catch (error) {
            console.error('Error creating note:', error);
          }
        }
        // setNotes(updatedNotes);
        clearNoteInput();

        setShowNotesPopup(null);
      }
    } else {
      showError("Please include a title and a note.");
    }
  };

  const clearNoteInput = () => {
    setNewTitle('');
    setNewNote('');
  };

  const showError = (message) => {
    toast.error(message);
  };

  const deleteNote = async (index, id) => {
    if (index >= 0 && index < notes.length) {
      if (window.confirm("Are you sure you want to delete this note?")) {
        try{
          const payload = {
            id: id,
          };

          const response = await fetch(`/users/${userName}/deleteNote`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          fetchUserNotes();
        } catch (error){
          console.error('Error deleting note:', error);
        }
      }
    }
  };

  const editNote = async (index,id) => {
    setShowNotesPopup(index);
    setNewTitle(notes[index].title);
    setNewNote(notes[index].content);
    setNewNoteID(id);
  };

  const exitAddNote = () => {
    if (showNotesPopup !== null || newTitle || newNote) {
      if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
        clearNoteInput();
        setShowNotesPopup(null);
      }
    } else {
      clearNoteInput();
      setShowNotesPopup(null);
    }
  };

  const acceptInvite = () => {

  }

  const rejectInvite = () => {

  }

  return (
    <DashboardContainer>
      <SearchBar />
      <BackgroundImage src={bgImg} alt="bgImg" />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
      <SidebarColumn>
        <Sidebar userName = {userName} />
      </SidebarColumn>
      <DashboardInfo>
        <StatsContainer>
          <StatBox>
            <h2 className="number">{connectionCount}</h2>
            <p className="descriptor">Connections</p>
          </StatBox>
          <StatBox>
            <h2 className="number">{eventCount}</h2>
            <p className="descriptor">Upcoming Events</p>
          </StatBox>
          <StatBox>
            <h2 className="number">{notes.length}</h2>
            <p className="descriptor">Notes</p>
          </StatBox>
        </StatsContainer>
        <SocialsBox>
          <EventConnectionDisplay>
            <p style={{marginBottom: '0.75rem'}} className="descriptor">Upcoming Events</p>
            <ContentContainer>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0}}>
                {groupedUserEvents.map((eventList, index) => (
                  <EventListContainer style={{marginBottom:'0.25rem'}} key={`list-${index}`}>
                    <DateBox style={{color:'white', marginBottom:'0.25rem', fontWeight: 'bold', fontSize: '1rem'}}>{new Date(eventList[0].start).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</DateBox>
                    {eventList.map((event) => (
                      <li key={event.id}>
                        <span style={{fontWeight: 'bold', paddingLeft: '0.25rem', paddingRight: '0.5rem'}}>
                          {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} : {' '}
                        </span>
                        <span style={{ width: '40%', display: 'inline-block' }}>{event.title}</span>
                      </li>
                    ))}
                  </EventListContainer>
                ))}
              </ul>
            </ContentContainer>
          </EventConnectionDisplay>
          <EventConnectionDisplay>
            <p style={{marginBottom: '0.75rem'}} className="descriptor">New Connections</p>
            <ContentContainer>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0}}>
                {/* INCOMING CONNECTIONS */}
                {
                  incomingConnections.map((connection, index) => {
                    return (
                      <li key={`incoming-${index}`}>
                      <IncomingConnection>
                      {/* Display username of incoming connection */}
                      <p className="connection-username">
                        {connection.username ? (
                          <span>
                            <strong>{connection.username}</strong> has sent you a connection request. Accept the invite?
                          </span>
                        ) : (
                          'Unknown user wants to connect with you. Accept the invite?'
                        )}
                      </p>
                      {/* Accept invite */}
                      <button onClick={() => acceptInvite()} style={{ fontSize: "8px" }}>
                        <CheckCircleIcon 
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: 'transparent',
                            color: 'green',
                            borderRadius: '50%',
                            display: 'block', 
                        }}/>
                      </button>
                      {/* Reject invite */}
                      <button onClick={() => rejectInvite()} style={{ fontSize: "8px" }}>
                        <CancelIcon 
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: 'transparent',
                            color: 'red',
                            borderRadius: '50%',
                            display: 'block', 
                        }}/>
                      </button>
                      </IncomingConnection>
                    </li>
                    )
                  })}
              </ul>
            </ContentContainer>
          </EventConnectionDisplay>
        </SocialsBox>
        <NotesBox>
          <NotesHeader>
            <p className="descriptor">Notes</p>
            <button onClick={() => setShowNotesPopup(-1)}>New Note</button>
          </NotesHeader>
          <NotesList>
            {notes && notes.length > 0 ? (
              notes.map((note, index) => (
                <div className="note-item" key={index}>
                  <p className="note-title" onClick={() => editNote(index, note._id)}>
                    {note ? note.title : 'No Title'}
                  </p>
                  <button onClick={() => deleteNote(index,note._id)} style={{ fontSize: "8px" }}>
                    <DeleteIcon />
                  </button>
                </div>
              ))
            ) : (
              <p>No notes available</p>
            )}
        </NotesList>

          {showNotesPopup !== null && (
            <NotesPopup>
              <StyledInput
                type="text"
                placeholder="Enter title here"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <StyledTextArea
                rows="10"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your note here"
              />
              <div className="button-container">
                <button onClick={handleAddNote}>Save Note</button>
                <button onClick={exitAddNote}>Cancel</button>
              </div>
            </NotesPopup>
          )}
        </NotesBox>
      </DashboardInfo>
    </DashboardContainer>
  );
}

export default Dashboard;
