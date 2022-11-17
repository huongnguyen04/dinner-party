import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalContent = ({ toggle, theme, setTheme, date, setDate, host, setHost, setSelectedTheme, sendPartyOverviewDetails, watch, setWatch }) => {
  const [modalView1, setModalView1] = useState(true);
  // const [modalView2, setModalView2] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [cuisines, setCuisines] = useState(null);
  const [tempTheme, setTempTheme] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [tempHost, setTempHost] = useState('')

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
    {modalView1 &&
      <>
        <div>
          Would you like to input a theme or choose from a list?
        </div>
        <br></br>
        <StyledModalView1>
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
          <button class='no-padding' onClick={() => setModalView1(!modalView1)}>next</button>
        </StyledModalView1>
      </>
    }
     {!modalView1 && !userInput &&
      <>
        <div>Select an option and we'll generate a menu for you.</div>
        <br></br>
        <form onSubmit={(e)=> {
          e.preventDefault();
          setTheme(tempTheme);
          setDate(tempDate);
          setHost(tempHost);
          sendPartyOverviewDetails();
          setWatch(!watch);
          toggle();
        }}>
          <label htmlFor='theme'>Theme: </label>
          <select name='theme' onChange={(e) => {
            setSelectedTheme(e.target.value);
            setTempTheme(e.target.value);
          }}>
            <option>select a theme</option>
            {cuisineOptions}
          </select>
          <div>
            Date: <input type='date' value={tempDate} onChange={(e) => setTempDate(e.target.value)} required></input>
          </div>
          <div>
            Host: <input type='text' value={tempHost} onChange={(e) => setTempHost(e.target.value)} required></input>
          </div>
          <input type='submit'></input>
        </form>
       </>
    }
    {!modalView1 && userInput &&
      <StyledModalView1>
        <form onSubmit={(e)=> {
          e.preventDefault();
          setTheme(tempTheme);
          setDate(tempDate);
          setHost(tempHost);
          sendPartyOverviewDetails();
          toggle();
        }}>
          Theme: <input type='text' value={tempTheme} onChange={(e) => setTempTheme(e.target.value)} required></input>
          <br></br>
          Date: <input type='date' value={tempDate} onChange={(e) => setTempDate(e.target.value)} required></input>
          <br></br>
          Host: <input type='text' value={tempHost} onChange={(e) => setTempHost(e.target.value)} required></input>
          <br></br>
          <input type='submit'></input>
        </form>
      </StyledModalView1>
    }
  </>
  )
}

const StyledModalView1 = styled.div`
  text-align: center;
  vertical-align: middle;
`

export default ModalContent;