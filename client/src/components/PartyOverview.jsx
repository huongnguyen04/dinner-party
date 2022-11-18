import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import useModal from './useModal.jsx';
import '../assets/modal.css';

const PartyOverview = ( {theme, setTheme, date, setDate, host, setHost, generateMenu, sendPartyOverviewDetails, watch, setWatch, logout }) => {
  const {toggle, visible} = useModal();

  const reset = () => {
    axios.post('/delete')
    .then((res) => {
      console.log('cleared all')
      setWatch(!watch);
      })
      .catch((err) => console.log('error clearing all'))
  }

  return (
    <>
      <StyledOverview>
        <span><b>Theme:</b> {theme}</span>
        <span><b>Date:</b> {date}</span>
        <span><b>Host:</b> {host}</span>
        <StyledButtonContainer>
          <button onClick={toggle}>Edit Details</button>
          <button onClick={reset}>Reset</button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
          </button>
        </StyledButtonContainer>
      </StyledOverview>

      <div>
        <Modal visible={visible} toggle={toggle} setTheme={setTheme} setDate={setDate} setHost={setHost} generateMenu={generateMenu} />
      </div>
    </>
  );
}

const StyledOverview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  span {
    font-size: 18px;
    // display: inline-block;
    padding: 50px;
    color: white;
  }
  border: 1px solid white;
  height: 100px;

  button {
    color: #904E55;
    background-color: white;
    border: 1px solid #904E55;
    &:hover {
      box-shadow: 0 4px 5px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19);
    }
  }
`

const StyledButtonContainer = styled.div`
  margin-left: auto;
  button {
    margin: 3px;
  }
`

export default PartyOverview;