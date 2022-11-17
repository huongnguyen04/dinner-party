import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PartyOverview from './PartyOverview.jsx';
import Menu from './Menu.jsx';
import Guests from './Guests.jsx';

const AuthenticatedHome = ({ user }) => {
  const [userId, setUserId] = useState(null)
  const [entrees, setEntrees] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  const [sides, setSides] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [watch, setWatch] = useState(true);
  const [guests, setGuests] = useState();
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const [host, setHost] = useState('');

  const getMenu = () => {
    if (user) {
      axios.get(`/partyData/${user.sub}`)
        .then((res) => {
          console.log(res.data);
          setEntrees(res.data.entrees);
          setAppetizers(res.data.appetizers);
          setSides(res.data.sides);
          setDrinks(res.data.drinks);
          setDesserts(res.data.desserts);
          setGuests(res.data.guests);
          setTheme(res.data.theme);
          setDate(res.data.date);
          setHost(res.data.host);
        })
        .catch((err) => {
          console.log('Error getting data in DB. Error: ', err)
          setEntrees([]);
          setAppetizers([]);
          setSides([]);
          setDrinks([]);
          setDesserts([]);
          setGuests([]);
          setTheme('');
          setDate('');
          setHost('');
        })
    }
  }

  const sendPartyOverviewDetails = () => {
    console.log('in send party overview details')
    console.log('theme: ', theme, 'date: ', date, 'host: ', host)
    if (theme && date && host) {
      axios.post('/partyDetail', {userId: user.sub, theme: theme, date: date.toString(), host: host})
        .then((res) => console.log('added party details'))
        .catch((err) => console.log(err));
    }
  }

  useEffect(sendPartyOverviewDetails, [theme])

  const addGuest = (guest) => {
    axios.post('/guests', {userId: user.sub, guest: guest, confirmed: false})
      .then((res) => console.log('added guest'))
      .catch((err) => console.log(err));
  }

  const addEntree = (entree) => {
    axios.post('/entrees', {userId: user.sub, entree: entree})
      .then((res) => console.log('added entree'))
      .catch((err) => console.log(err));
  }

  const addAppetizer = (appetizer) => {
    axios.post('/appetizers', {userId: user.sub, appetizer: appetizer})
      .then((res) => console.log('added appetizer'))
      .catch((err) => console.log(err));
  }

  const addSide = (side) => {
    axios.post('/sides', {userId: user.sub, side: side})
      .then((res) => console.log('added side'))
      .catch((err) => console.log(err));
  }

  const addDrink = (drink) => {
    axios.post('/drinks', {userId: user.sub, drink: drink})
      .then((res) => console.log('added drink'))
      .catch((err) => console.log(err));
  }
  const addDessert = (dessert) => {
    axios.post('/desserts', {userId: user.sub, dessert: dessert})
      .then((res) => console.log('added dessert'))
      .catch((err) => console.log(err));
  }

  const reset = () => {
    axios.post('/delete')
    .then((res) => {
      console.log('cleared all')
      setWatch(!watch);
      })
      .catch((err) => console.log('error clearing all'))
  }

  const generateMenu = (selectedTheme) => {
    if (selectedTheme) {
      axios.get(`/cuisines/${selectedTheme}`)
        .then((res) => {
          for (let i = 0; i < 3; i++) {
            if (res.data.entrees[i]) {
              addEntree(res.data.entrees[i].name)
            }
            if (res.data.appetizers[i]) {
              addAppetizer(res.data.appetizers[i].name);
            }
            if (res.data.sides[i]) {
              addSide(res.data.sides[i].name);
            }
            if (res.data.drinks[i]) {
              addDrink(res.data.drinks[i].name);
            }
            if (res.data.desserts[i]) {
              addDessert(res.data.desserts[i].name);
            }
          }
          getMenu();
        })
        .catch((err) => {
          console.log('Error, could not get cuisines. Error: ', err);
        })
      }
  }

  useEffect(getMenu, [user, watch]);

  return (
    <div>
        <button onClick={reset}>Reset</button>

        <PartyOverview theme={theme} setTheme={setTheme} host={host} setHost={setHost} date={date} setDate={setDate} generateMenu={generateMenu} sendPartyOverviewDetails={sendPartyOverviewDetails} watch={watch} setWatch={setWatch} />
        <StyledContainer>
          <StyledMenu>
            <Menu addEntree={addEntree} addAppetizer={addAppetizer} addSide={addSide} addDrink={addDrink} addDessert={addDessert} entrees={entrees} setEntrees={setEntrees} appetizers={appetizers} setAppetizers={setAppetizers} sides={sides} setSides={setSides} drinks={drinks} setDrinks={setDrinks} desserts={desserts} setDesserts={setDesserts} getMenu={getMenu} watch={watch} setWatch={setWatch}/>
          </StyledMenu>
          <StyledGuests>
            <Guests guests={guests} setGuests={setGuests} addGuest={addGuest} watch={watch} setWatch={setWatch}/>
          </StyledGuests>
        </StyledContainer>
    </div>
  )
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "menu guests"
`

const StyledMenu = styled.div`
  grid-area: menu;
`

const StyledGuests = styled.div`
  grid-area: guests;
`

export default AuthenticatedHome;