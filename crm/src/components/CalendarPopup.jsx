import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "../styles/modal.css";

// Set the root element for the modal
Modal.setAppElement('#root');

/**
 * This component represents a modal popup for creating or editing calendar events.
 * 
 * @component
 * @param {object} isOpen - A boolean indicating whether the modal is open.
 * @param {function} onClose - A function to close the modal.
 * @param {function} onSave - A function to save or create a calendar event.
 * @param {function} onDelete - A function to delete a calendar event (only available in edit mode).
 * @param {string} mode - The mode of the popup ('create' for creating, 'edit' for editing).
 * @param {object} event - The event to edit (null in create mode).
 * @param {Date} start - The start date and time of the event.
 * @param {Date} end - The end date and time of the event.
 * @returns {JSX.Element} A JSX element representing the calendar event popup.
 */
function CalendarPopup({ isOpen, onClose, onSave, onDelete, mode, event, start, end }) {
    // State variables to manage event details
    const [eventName, setEventName] = useState('');
    const [startDatetime, setStartDatetime] = useState(start);
    const [endDatetime, setEndDatetime] = useState(end);

    // Populate input fields when the component mounts or when an event is provided
    useEffect(() => {
        if (event) {
            setEventName(event.title || '');
            setStartDatetime(event.start);
            // If no end time is provided, use the start time as the end time
            if (!event.end){
                setEndDatetime(event.start)
            } else {
                setEndDatetime(event.end);
            }
        } else {
            // Reset input fields in create mode
            setEventName('');
            setStartDatetime(start);
            setEndDatetime(end);
        }
    }, [event, start, end]);

    // Handle saving or updating an event
    const handleSave = () => {
        if (!eventName){
            toast.error('You must enter a name before submitting.');
            return
        }
        if (!startDatetime || !endDatetime){
            toast.error('Please enter a valid time-frame.');
            return
        }

        if (startDatetime.getTime() > endDatetime.getTime()){
            toast.error('End-date & time must be later than Start-date & time.');
            return
        }

        // Calculate the time difference to determine if it's an all-day event
        const timeDiff = endDatetime.getTime() - startDatetime.getTime();
        const isAllDay = timeDiff >= 86400000;

        // Create or update the event object
        const updatedEvent = {
            title: eventName,
            start: startDatetime,
            end: endDatetime,
            allDay: isAllDay
        };

        // console.log(updatedEvent);

        // Invoke the provided onSave function with the updated event
        onSave(updatedEvent);

        // Reset input fields
        setEventName('');
        setStartDatetime(new Date());
        setEndDatetime(new Date());
    };

    // Render the calendar event popup
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={mode === 'create' ? 'Create Event' : 'Edit Event'}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className='header'>
                <h2 className='event-title'>{mode === 'create' ? 'Create Event' : 'Edit Event'}</h2>
                {mode === 'edit' ? (
                    <button className='delete-btn' onClick={onDelete}>Delete</button>
                ) : null}
            </div>
            <div className='popup-inputs'>
                <div className="event-name">
                    <label>Event name: </label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div className="datetime-picker">
                    <label>Start Date and Time: </label>
                    <DateTimePicker
                        onChange={(date) => {
                            setStartDatetime(date);
                            console.log(date);
                        }}
                        value={startDatetime}
                    />
                </div>
                <div className="datetime-picker">
                    <label>End Date and Time: </label>
                    <DateTimePicker
                        onChange={(date) => setEndDatetime(date)}
                        value={endDatetime}
                    />
                </div>
            </div>
            <div className='popup-btns'>
                <button className='btn' onClick={handleSave}>{mode === 'create' ? 'Create Event' : 'Save Changes'}</button>
                <button className='btn cancel-button' onClick={onClose}>Cancel</button>
            </div>
            
        </Modal>
    );
}

export default CalendarPopup;