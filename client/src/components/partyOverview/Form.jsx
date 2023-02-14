import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThemeInput from './ThemeInput.jsx';
import ChooseTheme from './ChooseTheme.jsx';
import RandomizedTheme from './RandomizedTheme.jsx';
import { formatInput } from '../formatInput.js';

const Form = ({ cuisines, generateMenu, selectedTheme, setSelectedTheme, setTheme, toggle, themeOption }) => {
  const [tempTheme, setTempTheme] = useState('');

  return (
    <form onSubmit={(e)=> {
      e.preventDefault();
      setTheme(formatInput(tempTheme));
      generateMenu(selectedTheme);
      toggle();
    }}>
      <StyledFlex>
        <StyledUserInput>
          {themeOption === 'input' &&
            <ThemeInput tempTheme={tempTheme} setTempTheme={setTempTheme} />}
          {themeOption === 'list' && <ChooseTheme cuisines={cuisines} setTempTheme={setTempTheme}/>}
          {themeOption === 'random' && <RandomizedTheme cuisines={cuisines} setTempTheme={setTempTheme}/>}
        </StyledUserInput>
      </StyledFlex>
      <br></br>
      <input type='submit'></input>
    </form>
  )
}

const StyledFlex = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledUserInput = styled.div`
  text-align: right;
`

export default Form;