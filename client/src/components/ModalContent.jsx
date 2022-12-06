import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { formatInput } from './formatInput.js';


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

  const formatDate = (date) => {
    let formatted = '';
    let split = date.split('-');
    formatted = split[1] + '-' + split[2] + '-' + split[0];
    return formatted;
  }

  return (
    <>
    {modalView1 &&
      <>
        <StyledModalView>
        <StyledQuestion>
          Would you like to input a theme or choose from a list?
        </StyledQuestion>
        <br></br>
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
          <div>
            <br></br>
            <button className='nextButton' onClick={() => setModalView1(!modalView1)}>Next</button>
          </div>
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
            setTheme(formatInput(tempTheme));
            setDate(formatDate(tempDate));
            setHost(formatInput(tempHost));
            generateMenu(selectedTheme);
            toggle();
          }}>
            <StyledFlex>
              <StyledUserInput>
                <label htmlFor='theme'>Theme: </label>
                <select className='selectTheme' onChange={(e) => {
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
              </StyledUserInput>
            </StyledFlex>
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
          setTheme(formatInput(tempTheme));
          setDate(formatDate(tempDate));
          setHost(formatInput(tempHost));
          toggle();
        }}>
          <StyledFlex>
            <StyledUserInput>
              Theme: <input type='text' value={tempTheme} onChange={(e) => setTempTheme(e.target.value)} required></input>
              <br></br>
              Date: <input type='date' value={tempDate} onChange={(e) => setTempDate(e.target.value)} required></input>
              <br></br>
              Host: <input type='text' value={tempHost} onChange={(e) => setTempHost(e.target.value)} required></input>
            </StyledUserInput>
          </StyledFlex>
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
  position: absolute;
  text-align: center;
  vertical-align: middle;
  height: 200px;
  width: 500px;
`

const StyledFlex = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledUserInput = styled.div`
  text-align: right;
`

const StyledQuestion = styled.div`
  margin-bottom: 20px;
`

export default ModalContent;