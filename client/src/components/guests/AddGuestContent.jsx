import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { formatInput } from '../formatInput.js';

const AddGuestContent = ({ toggle, addGuest }) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const onGuestButtonClick = () => {
    addGuest(formatInput(guestName), guestEmail);
    setGuestName('');
    toggle()
  }

  return (
    <>
    <StyledFlex>
      <div>
        <label for={guestName}>Guest Name: </label>
        <NameInput placeholder={'guest name*'} value={guestName} onChange={(e) => {
          if (e.target.value.length > 0) {
            setGuestName(e.target.value)
          }}} required>
        </NameInput>
        <br></br>
        <label for={guestEmail}>Guest Email: </label>
        <EmailInput type='email' placeholder={'guest email'} value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)}></EmailInput>
      </div>
      <br></br>
      <button onClick={onGuestButtonClick}>Add</button>
    </StyledFlex>
    </>
  )
}

const NameInput = styled.input`
  display: inline block;
  width: 100%;
`

const EmailInput = styled.input`
  display: inline block;
  width: 100%;
`

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default AddGuestContent;