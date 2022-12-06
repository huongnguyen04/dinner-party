import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { formatInput } from './formatInput.js';

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

    <input placeholder={'guest name'} value={guestName} onChange={(e) => {
      if (e.target.value.length > 0) {
        setGuestName(e.target.value)
      }}} required>
    </input>
    <br></br>
    <input type='email' placeholder={'guest email'} value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)}></input>
    <br></br>
    <button className='plus' onClick={onGuestButtonClick}>Add</button>

    </>
  )
}

export default AddGuestContent;