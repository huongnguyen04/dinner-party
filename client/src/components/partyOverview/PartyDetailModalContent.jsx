import React, { useState } from 'react';
import styled from 'styled-components';
import { formatInput } from '../formatInput.js';
import Form from './Form.jsx';
import SelectThemeOption from './SelectThemeOption.jsx';

const PartyDetailModalContent = ({ toggle, setTheme, setDate, setHost, generateMenu }) => {
  const [view, setView] = useState(true);
  const [cuisines, setCuisines] = useState(null);
  const [tempDate, setTempDate] = useState('');
  const [tempHost, setTempHost] = useState('');

  const formatDate = (date) => {
    let formatted = '';
    let split = date.split('-');
    formatted = split[1] + '-' + split[2] + '-' + split[0];
    return formatted;
  }

  return (
    <>
    <StyledModalView>
      {view &&
        <>
          <div>First, enter the party's host and date.</div>
          <br></br>
          <form onSubmit={(e)=> {
            e.preventDefault();
            setDate(formatDate(tempDate));
            setHost(formatInput(tempHost));
            setView(!view);
          }}>
          <StyledFlex>
            <StyledUserInput>
              <div>
                Date: <input type='date' value={tempDate} onChange={(e) => setTempDate(e.target.value)} required></input>
              </div>
              <div>
                Host: <input type='text' value={tempHost} onChange={(e) => setTempHost(e.target.value)} required></input>
              </div>
            </StyledUserInput>
          </StyledFlex>
          <br></br>
          <input type='submit' value={"next"}></input>
        </form>
      </>
      }
      {!view &&
        <SelectThemeOption cuisines={cuisines} setCuisines={setCuisines} generateMenu={generateMenu} setTheme={setTheme} toggle={toggle}/>
      }
    </StyledModalView>
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

export default PartyDetailModalContent;