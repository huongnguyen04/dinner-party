import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import useModal from './useModal.jsx';
import '../assets/modal.css';

const PartyOverview = ( {theme, setTheme, date, setDate, host, setHost, generateMenu, sendPartyOverviewDetails, watch, setWatch }) => {
  const [editModal, setEditModal] = useState(false);
  const [makeMenu, setMakeMenu] = useState(false);
  const [cuisines, setCuisines] = useState(null);
  const [modalView, setModalView] = useState(true);
  const [userInput, setUserInput] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const {toggle, visible} = useModal();

  const onSubmit = (e) => {
    e.preventDefault()
    if (makeMenu) {
      generateMenu();
    }
  }

  useEffect(()=> generateMenu(selectedTheme), [watch]);

  return (
    <>
      <StyledOverview>
        <span><b>Theme</b> {theme}</span>
        <span><b>Date</b> {date}</span>
        <span><b>Host</b> {host}</span>
        <button onClick={toggle}>Edit Details</button>
      </StyledOverview>

      <div>
        <Modal visible={visible} toggle={toggle} theme={theme} setTheme={setTheme} date={date} setDate={setDate} host={host} setHost={setHost} setSelectedTheme={setSelectedTheme} sendPartyOverviewDetails={sendPartyOverviewDetails} watch={watch} setWatch={setWatch} />
      </div>
    </>
  );
}

const StyledOverview = styled.div`
  text-align: center;
  span {
    font-size: 24px;
    display: inline-block;
    padding: 50px;
    color: #EFF1F3;
  }
`

export default PartyOverview;