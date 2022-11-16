import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const PartyOverview = () => {
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const [host, setHost] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [makeMenu, setMakeMenu] = useState(false);
  const [cuisines, setCuisines] = useState(null);
  const [modalView, setModalView] = useState(true);
  const [userInput, setUserInput] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault()
    setEditModal(false);
    if (makeMenu) {
      generateMenu();
    }
  }

  const generateMenu = () => {
    axios.get(`/cuisines/${selectedTheme}`)
    .then((res) => {
      console.log('response: ', res.data);
      //add 3 items to each menu category
    })
    .catch((err) => {
      console.log('Error, could not get cuisines. Error: ', err);
    })
  }

  useEffect(generateMenu, [selectedTheme]);

  const getCuisines = () => {
    axios.get(`/cuisines`)
      .then((res) => {
        console.log('response: ', res.data);
        setCuisines(res.data);
      })
      .catch((err) => {
        console.log('Error, could not get cuisines. Error: ', err);
      })
  }

  let cuisineOptions;
  if (cuisines) {
    cuisineOptions = cuisines.map((cuisine, index) =>
      <option key={index}>{cuisine}</option>
    )
  }

  return (
    <>
      <StyledOverview>
        <span><b>Theme</b> {theme}</span>
        <span><b>Date</b> {date}</span>
        <span><b>Host</b> {host}</span>
        <button onClick={()=>setEditModal(true)} >Edit</button>
      </StyledOverview>

      {editModal && <>
        {modalView &&
          <>
            <div>
              Would you like to input a theme or choose from a list?
            </div>
            <select onChange={(e) => {
                if (e.target.value === 'true') {
                  setUserInput(true);
                } else {
                  setUserInput(false);
                  getCuisines();
                }
              }}>
              <option value='select'>select an option</option>
              <option value={true}>I want to input a theme</option>
              <option value={false}>I want choose from a list</option>
            </select>
            <button onClick={() => setModalView(!modalView)}>next</button>
          </>
        }
        {!modalView && !userInput &&
          <>
            <div>Select an option and we'll generate a menu for you.</div>
            <select onChange={(e) => {
              setSelectedTheme(e.target.value);
            }}>
              <option>choose here</option>
              {cuisineOptions}
            </select>
            <button onClick={() => setEditModal(false)}>confirm</button>
          </>
        }
        {!modalView && userInput &&
          <form>
            Theme: <input type='text' value={theme} onChange={(e) => setTheme(e.target.value)}></input>
            <br></br>
            Date: <input type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
            <br></br>
            Host: <input type='text' value={host} onChange={(e) => setHost(e.target.value)}></input>
            <br></br>
            <button onClick={onSubmit}>submit</button>
          </form>
        }
      </>
      }
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