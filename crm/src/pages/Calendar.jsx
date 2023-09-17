import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ModalPopup from '../components/ModalPopup';
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

function Calendar() {
    const [currEvents, setEvents] = useState([
        {
            id: '1',
            title: 'Event 1',
            start: '2023-09-20T10:00:00',
            end: '2023-09-20T12:00:00',
        },
        {
            id: '2',
            title: 'Event 2',
            start: '2023-09-21T14:00:00',
            end: '2023-09-21T16:00:00',
        },
    ]);
    let eventIdCounter = 3;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());
    const [modalMode, setModalMode] = useState('create');

    const handleDateClick = (info) => {
        setModalMode('create');
        setCurrDate(info.date);
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEventClick = (info) => {
        setModalMode('edit');
        setCurrDate(null);
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
            setEvents([...currEvents, newEvent]);
          eventIdCounter++;
        } else if (modalMode === 'edit') {
            const updatedEvents = currEvents.map((e) =>
                e.id === selectedEvent.id ? { ...e, ...event } : e
            );
            setEvents(updatedEvents);
        }

        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <CalendarContainer>
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
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                    }}
                    events={currEvents}
                    eventResizableFromStart={true}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    selectable={true}
                    editable={true}
                    selectMirror={true}
                />
                <ModalPopup
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleCreateEvent}
                    mode={modalMode}
                    event={selectedEvent}
                    date={currDate}
                />
            </FullCalendarContainer>
        </CalendarContainer>
    );
}

export default Calendar;