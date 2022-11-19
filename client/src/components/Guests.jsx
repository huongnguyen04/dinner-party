import React, { useState } from 'react';
import styled from 'styled-components';
import GuestEntry from './GuestEntry.jsx';

const Guests = ({ guests, setGuests, addGuest, modifyGuest, watch, setWatch }) => {
  const [guest, setGuest] = useState('');
  const [showAllView, setShowAllView] = useState(true);
  const [confirmedView, setConfirmedView] = useState(false);
  const [nonConfirmedView, setNonConfirmedView] = useState(false)


  const onGuestButtonClick = () => {
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
        {showAllView && <GuestEntry guests={guests} setGuests={setGuests} modifyGuest={modifyGuest} />}
        {confirmedView && <GuestEntry guests={confirmedList} setGuests={setGuests} modifyGuest={modifyGuest} />}
        {nonConfirmedView && <GuestEntry guests={nonConfirmedList} setGuests={setGuests} modifyGuest={modifyGuest} />}
      </StyledGuestsArea>

      <div>
        <input placeholder={'add guest'} value={guest} onChange={(e) => setGuest(e.target.value)}></input>
        <button className='plus' onClick={onGuestButtonClick}>+</button>
      </div>

    </>
  );
}

const StyledGuestsArea = styled.div`
  min-height: 300px;
  border: 1px solid white;
`

const StyledBtn = styled.button`
  background: ${props => props.selected ? '#D3D3D3' : 'none'};
  color: ${props => props.selected ? '#904E55' : 'white'};
  border: 1px solid white;
  &:hover {
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19);
  }

`

export default Guests;