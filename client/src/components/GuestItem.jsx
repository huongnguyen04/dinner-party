import React from 'react';
import styled from 'styled-components';

const GuestItem = ({ guest, modifyGuest, deleteGuest }) => {

  const editGuest = () => {

  }

  return (
    <>
      <StyledWrapper id='wrapper'>
        <StyledGuest>
          {guest.confirmed ? <span onClick={() => modifyGuest(guest)}>✓</span> : <span onClick={() => modifyGuest(guest)}>☐</span>}
          &nbsp; {guest.name} &nbsp;
        </StyledGuest>
        <EditButton onClick={() => editGuest(guest)}>✎</EditButton>
        &nbsp;
        <DeleteButton onClick={() => deleteGuest(guest)}>ⓧ</DeleteButton>
      </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  display: inline-block;
  // div:hover ~ button, button:hover {
  // display: inline-block;
}
`

const StyledGuest = styled.div`
  display: inline-block;
  span {
    cursor: pointer;
  }
`

const DeleteButton = styled.button`
  display:  inline-block;
  padding: 0px;
  border: none;
  background: none;
`

const EditButton = styled.button`
  display:  inline-block;
  padding: 0px;
  border: none;
  background: none;
`

export default GuestItem;