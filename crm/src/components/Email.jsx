import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import Modal from 'react-modal';
import { secondaryColor } from '../utils/Color';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  background-color: ${secondaryColor};
  color: white;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  margin: 0;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

const FormField = styled.div`
  margin-left: 1.3rem;
  margin-right: 1.3rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border: 1px solid black;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 15rem;
  min-width: 458px;
  max-width: 458px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border: 1px solid black;
    outline: none;
  }
`;

const SubmitButton = styled.button`
    background-color: ${secondaryColor};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    width: 40%;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;

    &:hover {
    background-color: #0056b3;
    }
`;

export default function Email({ onToggle, showEmailPopup }) {
  const form = useRef();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '0',
    },
  };

  const closeModal = () => {
    onToggle();
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID') // Replace with your actual IDs
      .then((result) => {
        console.log(result.text);
        closeModal(); // Close the modal after sending the email
      })
      .catch((error) => {
        console.error(error.text);
      });
  };

  return (
    <Modal
      isOpen={showEmailPopup}
      onRequestClose={closeModal}
      contentLabel="Email Modal"
      style={customStyles}
    >
      <ModalWrapper>
        <ModalHeader>
          Email Form
          <CloseButton onClick={closeModal}>X</CloseButton>
        </ModalHeader>
        <StyledForm ref={form} onSubmit={sendEmail}>
          <FormField>
            <Label>From:</Label>
            <Input type="text" name="user_name" placeholder="Your Name" required />
          </FormField>
          <FormField>
            <Label>To:</Label>
            <Input type="email" name="destination_email" placeholder="Recipient Email" required />
          </FormField>
          <FormField>
            <Label>Message:</Label>
            <Textarea name="message" placeholder="Your Message" required />
          </FormField>
          <SubmitButton type="submit">Send</SubmitButton>
        </StyledForm>
      </ModalWrapper>
    </Modal>
  );
}
