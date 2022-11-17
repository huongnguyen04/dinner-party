import React, { useState } from 'react';
import GuestEntry from './GuestEntry.jsx';

const Guests = ({ guests, setGuests, watch, setWatch, addGuest }) => {
  const [guest, setGuest] = useState('');
  const [confirmedView, setConfirmedView] = useState(true);


  const onGuestButtonClick = () => {
    setWatch(!watch);
    addGuest(guest);
    setGuest('');
  }

  let confirmedList;
  let nonConfirmedList;

  if (guests && guests.length > 0) {
    confirmedList = guests.filter(() => guests.confirmed);
    nonConfirmedList = guests.filter(() => !guests.confirmed);
  }

  const onConfirmedClick = () => {
    setConfirmedView(true);
  }

  const onNotConfirmedClick = () => {
    setConfirmedView(false);
  }

  return (
    <>
      <h1>Guests</h1>

      <button onClick={onConfirmedClick}>Confirmed</button> <button onClick={onNotConfirmedClick}>Not Confirmed</button>

      {confirmedView && <GuestEntry guests={confirmedList}/>}
      {!confirmedView && <GuestEntry guests={nonConfirmedList}/>}

      <div>
        <input placeholder={"add more guests"} value={guest} onChange={(e) => setGuest(e.target.value)}></input>
        <button onClick={onGuestButtonClick}>+</button>
      </div>

    </>
  );
}

export default Guests;