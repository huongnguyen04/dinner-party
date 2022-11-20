import React from 'react';
import styled from 'styled-components';

const GuestItem = ({ guest, modifyGuest, deleteGuest }) => {

  return (
    <>
      <StyledWrapper>
        <StyledGuest>
          {guest.confirmed ? <span onClick={() => modifyGuest(guest)}>✓</span> : <span onClick={() => modifyGuest(guest)}>☐</span>}
          &nbsp; {guest.name} &nbsp;
        </StyledGuest>
        <DeleteButton onClick={() => deleteGuest(guest)}>ⓧ</DeleteButton>
      </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  div:hover + button, button:hover {
  display: inline-block;
}
`

const StyledGuest = styled.div`
  display: inline-block;
  span {
    cursor: pointer;
  }
`

const DeleteButton = styled.button`
  display: none;
  padding: 0px;
  border: none;
`

export default GuestItem;