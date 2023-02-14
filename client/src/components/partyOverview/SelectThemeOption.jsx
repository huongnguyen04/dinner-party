import React, { useState } from 'react';
import Form from './Form.jsx';
import styled from 'styled-components';
import axios from 'axios';

const SelectThemeOption = ({ cuisines, setCuisines, generateMenu, selectedTheme, setSelectedTheme, setTheme, toggle }) => {
  const [view, setView] = useState(true);
  const [userInput, setUserInput] = useState(null);
  const [themeOption, setThemeOption] = useState('');

  const getCuisines = () => {
    axios.get(`/cuisines`)
      .then((res) => {
        // console.log('response: ', res.data);
        setCuisines(res.data);
      })
      .catch((err) => {
        console.log('Error, could not get cuisines. Error: ', err);
      })
  }

  return (
    <>
      {view &&
      <>
      <StyledQuestion>
        Great! Now let's choose a theme. Would you like to input a theme, choose from a list, or get a random theme?
      </StyledQuestion>
      <br></br>
        <select onChange={(e) => {
            if (e.target.value === 'input') {
              setThemeOption('input');
            } else {
              if (e.target.value === 'list') {
                setThemeOption('list');
              } else {
                setThemeOption('random');
              }
              getCuisines();
            }
          }} required>
          <option value='select'>Select an option</option>
          <option value='input'>I want to input a theme</option>
          <option value='list'>I want choose from a list</option>
          <option value='random'>Just choose for me!</option>
        </select>
        <div>
          <br></br>
          <button className='nextButton' onClick={() => setView(!view)}>Next</button>
        </div>
        </>
      }
      {!view &&
        <Form cuisines={cuisines} generateMenu={generateMenu} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} setTheme={setTheme} toggle={toggle} themeOption={themeOption} />
      }
    </>
  )
};

const StyledQuestion = styled.div`
  margin-bottom: 20px;
`

export default SelectThemeOption;