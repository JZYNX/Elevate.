import React, {useState} from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/nikuubg.jpg';
import { primaryColor, secondaryColor } from '../utils/Color';

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
`;

// stats row on dashboard
const StatsContainer = styled.div`
  display: flex;
  flex: 0.75;
  flex-direction: row;
  margin-left: 10%;
`;
const StatBox = styled.div`
  flex: 1;
  text-align: left;

  h2.number {
    font-size: 36px; /* Adjust the font size as needed */
    padding-top: 30px;
    margin-bottom: 0;
    font-weight: bold;
    text-align: left;
  }
  p.descriptor {
    font-size: 18px; /* Adjust the font size as needed */
    margin-top: 0px;
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
    font-size: 1.125rem; /* Adjust the font size as needed */
    font-weight: bold;
    margin-top: 0.313rem;
    text-align:
  }
`;
const ConnectionsDisplay = styled.div`
  flex: 1;
  p.descriptor {
    font-size: 1.125rem; /* Adjust the font size as needed */
    font-weight: bold;
    margin-top: 0.313rem;
    text-align:
  }
`;

// implement notes display and create pop up notes feature
const NotesBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-left: 10%;
  margin-right: 30%;

  p.descriptor {
    font-size: 1.5rem; /* Adjust the font size as needed */
    font-weight: bold;
    margin-top: 0rem;
    text-align: left;
  }

  button {
    height: 2.5rem;
    width: 8rem;
    text-align: center;
    background-color: ${secondaryColor}; /* Use your desired button color */
    font-family: 'Poppins', sans-serif;
    color: white;
    border: none;
    border-radius: 1.25rem;
    padding: 0.625rem 1.25rem;
    margin-top: 0rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${primaryColor}; /* Use a darker color for hover effect */
    }
  }

  .notes-list {
    overflow-y: auto;
    max-height: 200px; /* Adjust the maximum height as needed */
    margin-top: 10px;
  }

  /* Style for individual note items */
  .note-item {
    margin-bottom: 10px;
  }
`;
const NotesPopup = styled.div`
  position: absolute;
  left: 63rem;
  background-color: #f0f0f0; /* Use the same background color as the sidebar */
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 20px;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  input[type="text"] {
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 13px;
    resize: vertical;
  }

  textarea {
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 13px;
    resize: vertical;
  }

  button {
    background-color: ${secondaryColor}; /* Use your desired button color */
    color: white;
    border: none;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${primaryColor}; /* Use a darker color for hover effect */
    }
  }
  .button-container {
    display: flex;
    justify-content: space-between;
    padding-left: 50px; 
    padding-right: 50px;
  }
`;

function Dashboard() {

  const [showNotesPopup, setShowNotesPopup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newTitle && newNote) {
      setNotes([...notes, { title: newTitle, note: newNote }]);
      setNewTitle('');
      setNewNote('');
    }
    setShowNotesPopup(null);
  };
    
  const editNote = (index) => {
    setShowNotesPopup(index);
  };

  const updateTitle = (value) => {
    if (showNotesPopup !== null && showNotesPopup >= 0 && showNotesPopup < notes.length) {
      const updatedNotes = [...notes];
      updatedNotes[showNotesPopup].title = value;
      setNotes(updatedNotes);
    } else {
      setNewTitle(value);
    }
  };
  
  const updateNote = (value) => {
    if (showNotesPopup !== null && showNotesPopup >= 0 && showNotesPopup < notes.length) {
      const updatedNotes = [...notes];
      updatedNotes[showNotesPopup].note = value;
      setNotes(updatedNotes);
    } else {
      setNewNote(value);
    }
  };

  const exitAddNote = () => {
    setShowNotesPopup(null);
  };

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
          <div className="notes-list">
          {notes.map((note, index) => (
            <div className="note-item" key={index}>
              <div className="note-item-header">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Title: {note ? note.title : 'No Title'}</p>
                <button onClick={() => editNote(index)}>Edit Note</button>
              </div>
            </div>
          ))}
          </div>
          <button onClick={() => setShowNotesPopup(-1)}>New Note</button>
          {showNotesPopup !== null && (
            <NotesPopup>
              <input
                type="text"
                placeholder="Enter title here"
                value={showNotesPopup !== null && showNotesPopup >= 0 && showNotesPopup < notes.length ? notes[showNotesPopup].title : newTitle}
                onChange={(e) => updateTitle(e.target.value)}
              />
              <textarea
                rows="4"
                cols="50"
                value={showNotesPopup !== null && showNotesPopup >= 0 && showNotesPopup < notes.length ? notes[showNotesPopup].note : newNote}
                onChange={(e) => updateNote(e.target.value)}
                placeholder="Enter your note here"
              />
              <div className="button-container">
                <button onClick={handleAddNote}>Save Note</button>
                <button onClick={exitAddNote}>Discard Note</button>
              </div>
            </NotesPopup>
          )}
        </NotesBox>
      </DashboardInfo>
    </DashboardContainer>
  );
}

export default Dashboard;
