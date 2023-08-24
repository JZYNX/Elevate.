import {React, useState}from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import bgImg from '../assets/nikuubg.jpg';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const BackgroundImage = styled.img`
  /* Add styles for the background image */
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: right;
  z-index: -1; /* Put the image behind other content */
`;

const CalendarContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: rgb(255, 255, 255, 0.2);
`;

const FullCalendarContainer = styled.div`
    position: relative;
    left: 5rem;
    width: 70%;
    color: black;
    padding-top: 40px;
`;

function Calendar() {
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt('Please enter a title for the event:');
    if (title) {
      const calendarApi = info.view.calendar;
      calendarApi.addEvent({
        title,
        start: info.dateStr, // Use the clicked date as the event start
        allDay: !info.allDay, // All-day or not
      });
    }
  };

  return (
    <CalendarContainer>
      {/* <BackgroundImage src={bgImg} alt="bgImg" /> */}
      <Sidebar />
      <FullCalendarContainer>
        <FullCalendar
            height="90vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth" 
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            events={currentEvents} 
            dateClick={handleDateClick} 
            selectable={true}
            editable={true}
            selectMirror={true}
            eventBorderColor='4px solid black'
        />
      </FullCalendarContainer>
    </CalendarContainer>
  );
}


export default Calendar;