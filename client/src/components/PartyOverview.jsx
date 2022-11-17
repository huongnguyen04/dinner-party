import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import useModal from './useModal.jsx';
import '../assets/modal.css';

const PartyOverview = ( {generateMenu }) => {
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const [host, setHost] = useState('');
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

  useEffect(()=> generateMenu(selectedTheme), [selectedTheme]);

  return (
    <>
      <StyledOverview>
        <span><b>Theme</b> {theme}</span>
        <span><b>Date</b> {date}</span>
        <span><b>Host</b> {host}</span>
        <button onClick={toggle}>Edit</button>
      </StyledOverview>

      <div>
        <Modal visible={visible} toggle={toggle} theme={theme} setTheme={setTheme} date={date} setDate={setDate} host={host} setHost={setHost} setSelectedTheme={setSelectedTheme} />
      </div>
    </>
  );
}

const StyledOverview = styled.div`
  span {
    display: inline-block;
    padding: 50px;
  }
`

export default PartyOverview;