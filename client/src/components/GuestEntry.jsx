import React, { useState } from 'react';
import styled from 'styled-components';

const GuestEntry = ({ guests, setGuests, modifyGuest }) => {

  let guestList;
  if (guests && guests.length > 0) {
    guestList = guests.map((guest, index) => {
      return <StyledGuest key={index}>{guest.confirmed ? <span onClick={() => modifyGuest(guest)}>✓</span> : <span onClick={() => modifyGuest(guest)}>☐</span>} {guest.name}</StyledGuest>
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