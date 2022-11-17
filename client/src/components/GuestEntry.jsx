import React, { useState } from 'react';

const GuestEntry = ({ guests }) => {

  let guestList;
  if (guests && guests.length > 0) {
    guestList = guests.map((guest, index) => {
      return <div key={index}>{guest.name}</div>
    })
  }
  return (
    <>
      {guestList ? guestList : null}
    </>
  )
}

export default GuestEntry;