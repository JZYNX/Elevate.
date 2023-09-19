import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "../styles/modal.css";

Modal.setAppElement('#root');

function CalendarPopup({ isOpen, onClose, onSave, onDelete, mode, event, start, end }) {
    const [eventName, setEventName] = useState('');
    const [startDatetime, setStartDatetime] = useState(start);
    const [endDatetime, setEndDatetime] = useState(end);

    useEffect(() => {
        if (event) {
            setEventName(event.title || '');
            setStartDatetime(event.start);
            if (!event.end){
                setEndDatetime(event.start)
            } else {
                setEndDatetime(event.end);
            }
        } else {
            setEventName('');
            setStartDatetime(start);
            setEndDatetime(end);
        }
    }, [event, start, end]);

    const handleSave = () => {
        if (!eventName){
            toast.error('You must enter a name before submitting.');
            return
        }
        if (!startDatetime || !endDatetime){
            toast.error('Please enter a valid time-frame.');
            return
        }
        const timeDiff = endDatetime.getTime() - startDatetime.getTime();
        const isAllDay = timeDiff >= 86400000;
        const updatedEvent = {
            title: eventName,
            start: startDatetime.toISOString(),
            end: endDatetime.toISOString(),
            allDay: isAllDay
        };

        onSave(updatedEvent);
        setEventName('');
        setStartDatetime(new Date());
        setEndDatetime(new Date());
    };

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
                        onChange={(date) => setStartDatetime(date)}
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