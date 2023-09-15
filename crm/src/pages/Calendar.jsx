import {React, useState}from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import "../styles/calendar.css";

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
              left: "prev today next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            events={currentEvents} 
            dateClick={handleDateClick} 
            selectable={true}
            editable={true}
            selectMirror={true}
        />
      </FullCalendarContainer>
    </CalendarContainer>
  );
}


export default Calendar;