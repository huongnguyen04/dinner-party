import React, { useState } from 'react';
import styled from 'styled-components';
import GuestItem from './GuestItem.jsx';

const GuestList = ({ guests, modifyGuest, deleteGuest }) => {

  let guestList;
  if (guests && guests.length > 0) {
    guestList = guests.map((guest, index) =>
      <GuestItem key={index} guest={guest} modifyGuest={modifyGuest} deleteGuest={deleteGuest}/>
    )
  }
  return (
    <>
      {guestList ? guestList : null}
    </>
  )
}

export default GuestList;