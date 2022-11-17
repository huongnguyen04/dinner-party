import React, { useState } from 'react';
import styled from 'styled-components';

const GuestEntry = ({ guests, setGuests }) => {

  const removeConfirmation = (guest) => {
    let copyGuests = guests.slice();
    let index = copyGuests.indexOf(guest);
    guest.confirmed = false;
    copyGuests[index] = guest;
    setGuests(copyGuests);
  }

  const addConfirmation = (guest) => {
    let copyGuests = guests.slice();
    let index = copyGuests.indexOf(guest);
    guest.confirmed = true;
    copyGuests[index] = guest;
    setGuests(copyGuests);
  }


  let guestList;
  if (guests && guests.length > 0) {
    guestList = guests.map((guest, index) => {
      return <StyledGuest key={index}>{guest.confirmed ? <span onClick={() => removeConfirmation(guest)}>✓</span> : <span onClick={() => addConfirmation(guest)}>☐</span>} {guest.name}</StyledGuest>
    })
  }
  return (
    <>
      {guestList ? guestList : null}
    </>
  )
}

const StyledGuest = styled.div`
  padding: 2px;
  margin: 2px;
  span {
    cursor: pointer;
  }
`

export default GuestEntry;