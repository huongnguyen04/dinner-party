import React, { useState } from 'react';
import styled from 'styled-components';
import GuestList from './GuestList.jsx';
import AddGuestModal from './AddGuestModal.jsx';
import useModal from './useModal.jsx';

const Guests = ({ guests, setGuests, addGuest, modifyGuest, deleteGuest, watch, setWatch, formatInput }) => {
  const [showAllView, setShowAllView] = useState(true);
  const [confirmedView, setConfirmedView] = useState(false);
  const [nonConfirmedView, setNonConfirmedView] = useState(false)

  const {toggle, visible} = useModal();

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
      <StyledGuestsArea id='guestArea'>
        {showAllView &&
          <GuestList guests={guests} modifyGuest={modifyGuest} deleteGuest={deleteGuest}/>}
        {confirmedView &&
          <GuestList guests={confirmedList} modifyGuest={modifyGuest} deleteGuest={deleteGuest} />}
        {nonConfirmedView &&
          <GuestList guests={nonConfirmedList} modifyGuest={modifyGuest} deleteGuest={deleteGuest} />}
      </StyledGuestsArea>
      <div>
        <button onClick={toggle}>Add Guest</button>
      </div>

      <div>
        <AddGuestModal visible={visible} toggle={toggle} addGuest={addGuest} />
      </div>

    </>
  );
}

const StyledGuestsArea = styled.div`
  min-height: 300px;
  border: ${({ theme }) => theme.guestAreaBorder};
  padding: 10px;
`

const StyledBtn = styled.button`
  background: ${({ theme }) => theme.overviewButtonBackground};
  color: ${({ theme }) => theme.overviewButtonText};
  border: 1px solid #904E55;
  &:hover {
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19);
  }

`

export default Guests;