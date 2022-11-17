import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import axios from 'axios';
import Typed from 'typed.js';
import { AppStyle } from '../assets/styles.js';
import PartyOverview from './PartyOverview.jsx';
import Menu from './Menu.jsx';
import Guests from './Guests.jsx';
import TypedAnimation from './TypedAnimation.jsx';

const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
  useAuth0();
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
          setEntrees(res.data[0].entrees);
          setAppetizers(res.data[0].appetizers);
          setSides(res.data[0].sides);
          setDrinks(res.data[0].drinks);
          setDesserts(res.data[0].desserts);
          setGuests(res.data[0].guests);
          setTheme(res.data[0].theme);
          setDate(res.data[0].date);
          setHost(res.data[0].host);
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
    axios.post('/partyDetail', {userId: user.sub, theme: theme, date: date.toString(), host: host})
      .then((res) => console.log('added party details'))
      .catch((err) => console.log(err));
  }

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

  useEffect(getMenu, [user, watch]);

  const generateMenu = (selectedTheme) => {
    if (selectedTheme) {
      axios.get(`/cuisines/${selectedTheme}`)
        .then((res) => {
          let entreeData = [];
          let appData = [];
          let sideData = [];
          let drinkData = [];
          let dessertData = [];
          for (let i = 0; i < 3; i++) {
            if (res.data.entrees[i]) {
              entreeData.push(res.data.entrees[i].name);
              addEntree(res.data.entrees[i].name)
            }
            if (res.data.appetizers[i]) {
              appData.push(res.data.appetizers[i].name);
              addAppetizer(res.data.appetizers[i].name);
            }
            if (res.data.sides[i]) {
              sideData.push(res.data.sides[i].name);
              addSide(res.data.sides[i].name);
            }
            if (res.data.drinks[i]) {
              drinkData.push(res.data.drinks[i].name);
              addDrink(res.data.drinks[i].name);
            }
            if (res.data.desserts[i]) {
              dessertData.push(res.data.desserts[i].name);
              addDessert(res.data.desserts[i].name);
            }
          }
          setEntrees(entreeData);
          setAppetizers(appData);
          setSides(sideData);
          setDrinks(drinkData);
          setDesserts(dessertData);
        })
        .catch((err) => {
          console.log('Error, could not get cuisines. Error: ', err);
        })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <>
      <AppStyle/>
      <StyledAppTitle>dinner party 🥘🎉</StyledAppTitle>
      {!isAuthenticated &&
      <>
      <StyledButtonAlign>
        <button onClick={loginWithRedirect}>Log In</button>
      </StyledButtonAlign>
      <StyledTextAlign>
        <StyledSubTitles>
          <h1>let's host a dinner party.</h1>
          <h2>the theme is...</h2>
          <TypedAnimation/>
        </StyledSubTitles>
      </StyledTextAlign>
      </>
      }
      {isAuthenticated &&
        <>
          <StyledLogOutButtonAlign>
            <button onClick={reset}>Reset</button>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </button>
          </StyledLogOutButtonAlign>
          <StyledGreeting>
            Hello, {user.name}{' 👋🏻 '}
          </StyledGreeting>
          {user &&
          <div>
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
          }
        </>
      }
    </>
  )
}

const StyledTextAlign = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledAppTitle = styled.h1`
  text-align: center;
  font-size: 42px;
`

const StyledSubTitles = styled.div`
  text-align: center;
`

const StyledGreeting = styled.div`
  text-align: center;
`

const StyledButtonAlign = styled.div`
  position: absolute;
  right: 30px;
  padding: 10px;
`

const StyledLogOutButtonAlign = styled.div`
  position: absolute;
  right: 30px;
  padding: 10px;
`

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

export default App;