import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import CalendarPopup from '../components/CalendarPopup';
import { defaultEventColor, textColor } from "../utils/Color";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/calendar.css";


const CalendarContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color:rgba(255, 255, 255, 0.3);
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%;
  min-width: 250px;
  background-color: #f0f0f0;
`;

const FullCalendarContainer = styled.div`
    position: relative;
    margin-top: 1rem;
    padding: 2rem;
    width: 100%;
    color: black;
`;

let eventIdCounter = 0;

function Calendar() {
    const urlParams = new URLSearchParams(window.location.search);
    // Get the 'username' parameter value from the URL
    const storedUsername = urlParams.get('username');
    const [userEvent, setUserEvent] = useState([]);
    useEffect(() => {
        async function fetchUserDataAndSetState() {
        try {
            const userResponse = await fetchUserEvents(storedUsername);
            if (userResponse.length === 0) {
                setUserEvent([]);
                eventIdCounter = 0;
            } else {
                setUserEvent(userResponse);
                const maxId = Math.max(...userResponse.map(event => parseInt(event.id)));
                eventIdCounter = maxId + 1;
            }
        } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserDataAndSetState();
    }, [storedUsername]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [modalMode, setModalMode] = useState('create');

    const handleDateClick = (info) => {
        setModalMode('create');
        setStartDate(info.date);
        const nEndDate = new Date(info.date);
        nEndDate.setMinutes(nEndDate.getMinutes() + 30);
        setEndDate(nEndDate);
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const HandleDateDrag = (info) => {
        setModalMode('create');
        setStartDate(info.start);
        setEndDate(info.end);
        setSelectedEvent(null);
        setIsModalOpen(true);
    }

    const handleEventClick = (info) => {
        setModalMode('edit');
        setStartDate(null);
        setEndDate(null);
        setSelectedEvent(info.event);
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleCreateEvent = (event) => {
        if (modalMode === 'create') {
            const newEvent = {
                id: eventIdCounter.toString(), 
                ...event
            };
            const requestData = {
                username: storedUsername,
                event: newEvent,
            };
            createEventsOnServer(requestData)
            eventIdCounter += 1;
        } else if (modalMode === 'edit') {
            const updatedEvents = userEvent.map((e) =>
                e.id === selectedEvent.id ? { ...e, ...event } : e
            );
            const requestData = {
                username: storedUsername,
                event: updatedEvents
            }
            editEventsOnServer(requestData)
        }

        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const createEventsOnServer = (requestData) => {
        // Assuming you send the entire updated events array to the server
        fetch('/users/createEvent', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((updatedUserData) => {
            setUserEvent(updatedUserData.events);
          })
          .catch((error) => {
            console.error('Error updating events:', error);
          });
    };

    const editEventsOnServer = (requestData) => {
        // Assuming you send the entire updated events array to the server
        fetch('/users/editEvents', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((updatedUserData) => {
            // Assuming your backend returns the updated user data
            // Update the userEvent state with the new data (if needed)
            setUserEvent(updatedUserData.events);
          })
          .catch((error) => {
            console.error('Error updating events:', error);
          });
    };

    const handleDeleteEvent = () => {
        const confirmDel = window.confirm("Are you sure you want to delete this event?");

        if (confirmDel){
            const updatedEvents = userEvent.filter(event => event.id !== selectedEvent.id);
            const requestData = {
                username: storedUsername,
                event: updatedEvents
            }
            editEventsOnServer(requestData)
            setIsModalOpen(false);
            console.log(`Event with id:${selectedEvent.id} deleted`);
        } else {
            return
        }
    }

    const handleEventChange = (info) => {
        const updatedEvent = {
            ...info.event.toPlainObject(), 
            start: info.event.start?.toISOString() || null,
            end: info.event.end?.toISOString() || null,
        };
    
        const updatedEvents = userEvent.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
        );

        const requestData = {
            username: storedUsername,
            event: updatedEvents
        }
        editEventsOnServer(requestData)

    };

    return (
        <CalendarContainer>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
            <SidebarColumn>
                <Sidebar />
            </SidebarColumn>
            <FullCalendarContainer>
                <FullCalendar
                    height="90vh"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,today,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    allDaySlot={true}
                    events={userEvent}
                    eventResizableFromStart={true}
                    eventStartEditable={true}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    select={HandleDateDrag}
                    eventBackgroundColor={defaultEventColor}
                    eventBorderColor={defaultEventColor}
                    eventTextColor={textColor}
                    eventDisplay={'block'}
                    selectable={true}
                    editable={true}
                    selectMirror={true}
                    dayMaxEventRows={true}
                    businessHours={true}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: 'short'
                    }}
                    navLinks={true}
                    eventDrop={handleEventChange} 
                    eventResize={handleEventChange}
                />
                <CalendarPopup
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleCreateEvent}
                    onDelete={handleDeleteEvent}
                    mode={modalMode}
                    event={selectedEvent}
                    start={startDate}
                    end={endDate}
                />
            </FullCalendarContainer>
        </CalendarContainer>
    );
    
}

const fetchUserEvents = async (username) => {
    try {
      const response = await fetch(`/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const allUserData = await response.json();
  
      // Filter the user data to find the matching username
      const userData = allUserData.find(user => user.username === username);
  
      if (!userData) {
        throw new Error(`User with username "${username}" not found`);
      }
  
      // Extract the "Events" field and return it
      const events = userData.events || []; // Default to an empty array if "Events" is not present
      return events;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Handle the error as needed
    }
};
  

export default Calendar;