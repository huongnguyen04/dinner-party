import React, { useState } from 'react';
import styled from 'styled-components';
import PartyDetailModal from './PartyDetailModal.jsx';
import useModal from '../useModal.jsx';

const PartyOverview = ({ theme, setTheme, date, setDate, host, setHost, generateMenu, sendPartyOverviewDetails, watch, setWatch, logout, setViewParty, setCurrentParty, resetParty, createNewParty }) => {
  const {toggle, visible} = useModal();

  const onResetClick = () => {
    resetParty();
    createNewParty();
    setWatch(!watch)
  }

  return (
    <>
      <StyledOverviewBanner id='overviewBanner'>
        <StyledButtonContainer>
          <button onClick={toggle}>Edit Details</button>
          <button onClick={onResetClick}>Reset</button>
        </StyledButtonContainer>
        <StyledOverviewDetails>
          <span><b>Theme:</b> {theme}</span>
          <span><b>Date:</b> {date}</span>
          <span><b>Host:</b> {host}</span>
        </StyledOverviewDetails>
      </StyledOverviewBanner>

      <div>
        <PartyDetailModal visible={visible} toggle={toggle} setTheme={setTheme} setDate={setDate} setHost={setHost} generateMenu={generateMenu} />
      </div>
    </>
  );
}

const StyledOverviewBanner = styled.div`
  height: 100px;
  border-radius: 5px;

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
    color: ${({ theme }) => theme.navButton};
    background-color: ${({ theme }) => theme.navButtonBg};
    border: ${({ theme }) => theme.navButtonBrdr};
    &:hover {
      box-shadow: 0 4px 5px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19);
    }
  }
`

export default PartyOverview;