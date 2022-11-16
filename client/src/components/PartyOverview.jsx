import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const PartyOverview = () => {
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const [host, setHost] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [makeMenu, setMakeMenu] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()
    setEditModal(false);
    if (makeMenu) {
      generateMenu();
    }
  }

  const generateMenu = () => {
    axios.get(`/cuisines/${theme}`)
      .then((res) => {
        console.log('response: ', res.data);
        //add 3 items to each menu category
      })
      .catch((err) => {
        console.log('Error, could not get cuisines. Error: ', err);
      })
  }


  return(
    <>
      <StyledOverview>
        <span><b>Theme</b> {theme}</span>
        <span><b>Date</b> {date}</span>
        <span><b>Host</b> {host}</span>
        <button onClick={()=>setEditModal(true)} >Edit</button>
      </StyledOverview>

      {editModal && <>
        <form>
          Theme: <input type='text' value={theme} onChange={(e) => setTheme(e.target.value)}></input>
          <div> Give me a theme! </div>
          <br></br>
          Date: <input type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
          <br></br>
          Host: <input type='text' value={host} onChange={(e) => setHost(e.target.value)}></input>
          <br></br>
          <button onChange={onChange}>submit</button>
        </form>
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