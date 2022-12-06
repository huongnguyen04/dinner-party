import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import useModal from './useModal.jsx';
import '../assets/modal.css';

const PartyOverview = ({ theme, setTheme, date, setDate, host, setHost, generateMenu, sendPartyOverviewDetails, watch, setWatch, logout, formatInput, setViewParty }) => {
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
      <StyledOverviewBanner id='overviewBanner'>
        <StyledButtonContainer>
          <button onClick={() => setViewParty(false)}>Home</button>
          <button onClick={toggle}>Edit Details</button>
          <button onClick={reset}>Reset</button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </StyledButtonContainer>
        <StyledOverviewDetails>
          <span><b>Theme:</b> {theme}</span>
          <span><b>Date:</b> {date}</span>
          <span><b>Host:</b> {host}</span>
        </StyledOverviewDetails>
      </StyledOverviewBanner>

      <div>
        <Modal visible={visible} toggle={toggle} setTheme={setTheme} setDate={setDate} setHost={setHost} generateMenu={generateMenu} formatInput={formatInput} />
      </div>
    </>
  );
}

const StyledOverviewBanner = styled.div`
  height: 100px;
`

const StyledOverviewDetails = styled.div`
  text-align: center;
  span {
    font-size: 18px;
    padding-left: 50px;
    padding-right: 50px;s
  }
`

const StyledButtonContainer = styled.div`
  text-align: right;
  margin: 6px;
  margin-bottom: 15px;

  button {
    margin: 3px;
    color: ${({ theme }) => theme.overviewButtonText};
    background-color: ${({ theme }) => theme.overviewButtonBackground};
    border: none;
    &:hover {
      box-shadow: 0 4px 5px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19);
    }
  }
`

export default PartyOverview;