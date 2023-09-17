import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "../styles/calendar.css";

Modal.setAppElement('#root');

function ModalPopup({ isOpen, onClose, onSave, mode, event, date }) {
    const [eventName, setEventName] = useState('');
    const [startDatetime, setStartDatetime] = useState(date);
    const [endDatetime, setEndDatetime] = useState(date);

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
            setStartDatetime(date);
            setEndDatetime(date);
        }
    }, [event, date]);

    const handleSave = () => {
        const updatedEvent = {
            title: eventName,
            start: startDatetime.toISOString(),
            end: endDatetime.toISOString(),
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
            <h2 className='event-title'>{mode === 'create' ? 'Create Event' : 'Edit Event'}</h2>
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
            <button onClick={handleSave}>{mode === 'create' ? 'Create Event' : 'Save Changes'}</button>
            <button onClick={onClose}>Cancel</button>
        </Modal>
    );
}

export default ModalPopup;