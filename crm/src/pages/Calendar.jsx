import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker'; 
import "../styles/calendar.css";

Modal.setAppElement('#root');

const CalendarContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color:rgba(255, 255, 255, 0.3);
`;

const SidebarColumn = styled.div`
  flex: 0 0 15%; /* Fixed width for the sidebar */
  min-width: 250px; /* Minimum width to prevent squishing */
  background-color: #f0f0f0; /* Adjust as needed */
`;

const FullCalendarContainer = styled.div`
    position: relative;
    margin-top: 1rem;
    padding: 2rem;
    width: 100%;
    color: black;
`;

function Calendar() {
  const [currEvents, setEvents] = useState([
    {
      title: 'Event 1',
      start: '2023-09-20T10:00:00',
      end: '2023-09-20T12:00:00',
    },
    {
      title: 'Event 2',
      start: '2023-09-21T14:00:00',
      end: '2023-09-21T16:00:00',
    },
  ]);
  const [eventName, setEventName] = useState('');
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = () => {
    setIsModalOpen(true);
    document.querySelector('.fc').style.selectable = 'false';
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleCreateEvent = () => {
    const newEvent = {
      title: eventName,
      start: startDatetime.toISOString(),
      end: endDatetime.toISOString(),
    };
  
    setEvents([...currEvents, newEvent]);
  
    setEventName('');
    setStartDatetime(new Date());
    setEndDatetime(new Date());
  
    setIsModalOpen(false);
  };

  return (
    <CalendarContainer>
      <SidebarColumn>
          <Sidebar />
      </SidebarColumn>
      {/* <BackgroundImage src={bgImg} alt="bgImg" /> */}
      <FullCalendarContainer>
        <FullCalendar
            height="90vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth" 
            headerToolbar={{
              left: "prev,today,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            events={currEvents} 
            dateClick={handleDateClick} 
            selectable={true}
            editable={true}
            selectMirror={true}
        />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Event Details"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2 className='event-title'>Create Event</h2>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <div className="datetime-picker">
            <label>Start Date and Time:</label>
            <DateTimePicker
              onChange={(date) => setStartDatetime(date)}
              value={startDatetime}
            />
          </div>
          <div className="datetime-picker">
            <label>End Date and Time:</label>
            <DateTimePicker
              onChange={(date) => setEndDatetime(date)}
              value={endDatetime}
            />
          </div>
          <button onClick={handleCreateEvent}>Create Event</button>
          <button onClick={handleModalClose}>Cancel</button>
        </Modal>
      </FullCalendarContainer>
    </CalendarContainer>
  );
}


export default Calendar;