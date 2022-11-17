import React, { useState } from 'react';
import axios from 'axios';

const ModalContent = ({ theme, setTheme, date, setDate, host, setHost, setSelectedTheme }) => {
  const [modalView1, setModalView1] = useState(true);
  const [userInput, setUserInput] = useState(null);
  const [cuisines, setCuisines] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
  }

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
        <button onClick={() => setModalView1(!modalView1)}>next</button>
      </>
    }
     {!modalView1 && !userInput &&
      <>
         <div>Select an option and we'll generate a menu for you.</div>
         <select onChange={(e) => {
          setSelectedTheme(e.target.value);
          setTheme(e.target.value)
        }}>
          <option>choose here</option>
          {cuisineOptions}
         </select>
       </>
    }
    {!modalView1 && userInput &&
      <form>
        Theme: <input type='text' value={theme} onChange={(e) => setTheme(e.target.value)}></input>
        <br></br>
        Date: <input type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
        <br></br>
        Host: <input type='text' value={host} onChange={(e) => setHost(e.target.value)}></input>
        <br></br>
      </form>
    }
  </>
  )
}

export default ModalContent;