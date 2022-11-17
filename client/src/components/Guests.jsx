import React, { useState } from 'react';
import styled from 'styled-components';
import GuestEntry from './GuestEntry.jsx';

const Guests = ({ guests, setGuests, watch, setWatch, addGuest }) => {
  const [guest, setGuest] = useState('');
  const [showAllView, setShowAllView] = useState(true);
  const [confirmedView, setConfirmedView] = useState(false);
  const [nonConfirmedView, setNonConfirmedView] = useState(false)


  const onGuestButtonClick = () => {
    setWatch(!watch);
    addGuest(guest);
    setGuest('');
  }

  let confirmedList;
  let nonConfirmedList;

  if (guests && guests.length > 0) {
    confirmedList = guests.filter((guest) => guest.confirmed);
    nonConfirmedList = guests.filter((guest) => !guest.confirmed);
  }

  const onAllClick = () => {
    setShowAllView(true);
    setConfirmedView(false);
    setNonConfirmedView(false);
  }

  const onConfirmedClick = () => {
    setConfirmedView(true);
    setShowAllView(false);
    setNonConfirmedView(false);
  }

  const onNotConfirmedClick = () => {
    setNonConfirmedView(true);
    setConfirmedView(false);
    setShowAllView(false);
  }


  return (
    <>
      <h1>Guests</h1>
      <StyledBtn selected={showAllView} onClick={onAllClick}>All Guests</StyledBtn>
      <StyledBtn selected={confirmedView} onClick={onConfirmedClick}>Confirmed</StyledBtn>
      <StyledBtn selected={nonConfirmedView} onClick={onNotConfirmedClick}>Not Confirmed</StyledBtn>
      <StyledGuestsArea>
        {showAllView && <GuestEntry guests={guests} setGuests={setGuests}/>}
        {confirmedView && <GuestEntry guests={confirmedList} setGuests={setGuests}/>}
        {nonConfirmedView && <GuestEntry guests={nonConfirmedList} setGuests={setGuests}/>}
      </StyledGuestsArea>

      <div>
        <input placeholder={"add guest"} value={guest} onChange={(e) => setGuest(e.target.value)}></input>
        <button className='plus' onClick={onGuestButtonClick}>+</button>
      </div>

    </>
  );
}

const StyledGuestsArea = styled.div`
  min-height: 300px;
  border: 1px solid black;
`

const StyledBtn = styled.button`
  background: ${props => props.selected ? '#D3D3D3' : 'none'}
`

export default Guests;