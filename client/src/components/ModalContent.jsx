import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalContent = ({ toggle, setTheme, setDate, setHost, generateMenu }) => {
  const [modalView1, setModalView1] = useState(true);
  const [userInput, setUserInput] = useState(null);
  const [cuisines, setCuisines] = useState(null);
  const [tempTheme, setTempTheme] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [tempHost, setTempHost] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(null);

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
        <StyledModalView>
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
          <button className='no-padding' onClick={() => setModalView1(!modalView1)}>next</button>
        </StyledModalView>
      </>
    }
     {!modalView1 && !userInput &&
      <>
        <StyledModalView>
          <div>Select an option and we'll generate a menu for you.</div>
          <br></br>
          <form onSubmit={(e)=> {
            e.preventDefault();
            setTheme(tempTheme);
            setDate(tempDate);
            setHost(tempHost);
            generateMenu(selectedTheme);
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
            <br></br>
            <input type='submit'></input>
          </form>
        </StyledModalView>
       </>
    }
    {!modalView1 && userInput &&
      <StyledModalView>
        <form onSubmit={(e)=> {
          e.preventDefault();
          setTheme(tempTheme);
          setDate(tempDate);
          setHost(tempHost);
          toggle();
        }}>
          Theme: <input className='themeSelect' type='text' value={tempTheme} onChange={(e) => setTempTheme(e.target.value)} required></input>
          <br></br>
          Date: <input type='date' value={tempDate} onChange={(e) => setTempDate(e.target.value)} required></input>
          <br></br>
          Host: <input type='text' value={tempHost} onChange={(e) => setTempHost(e.target.value)} required></input>
          <br></br>
          <br></br>
          <input type='submit'></input>
        </form>
      </StyledModalView>
    }
  </>
  )
}

const StyledModalView = styled.div`
  // display: flex;
  // flex-direction: column;
  text-align: center;
  vertical-align: middle;
`

export default ModalContent;