import React, { useState } from 'react';
import styled from 'styled-components';
import ThemeInput from './ThemeInput.jsx';
import ChooseTheme from './ChooseTheme.jsx';
import RandomizedTheme from './RandomizedTheme.jsx';
import { formatInput } from '../formatInput.js';

const Form = ({ cuisines, generateMenu, setTheme, toggle, themeOption }) => {
  const [tempTheme, setTempTheme] = useState('');

  return (
    <form onSubmit={(e)=> {
      e.preventDefault();
      if (themeOption === 'list' || themeOption === 'random') {
        setTheme(formatInput(tempTheme + ' Cuisine'));
        generateMenu(formatInput(tempTheme));
      } else {
        setTheme(formatInput(tempTheme));
      }
      toggle();
    }}>
      <StyledFlex>
        <div>
          {themeOption === 'input' &&
            <ThemeInput tempTheme={tempTheme} setTempTheme={setTempTheme} />}
          {themeOption === 'list' &&
            <ChooseTheme cuisines={cuisines} setTempTheme={setTempTheme}/>}
          {themeOption === 'random' &&
            <RandomizedTheme cuisines={cuisines} tempTheme={tempTheme} setTempTheme={setTempTheme}/>}
        </div>
      </StyledFlex>
      <br></br>
      <input type='submit' value='Done'></input>
    </form>
  )
}

const StyledFlex = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Form;