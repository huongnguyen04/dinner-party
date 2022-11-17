import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import axios from 'axios';
import { AppStyle } from '../assets/styles.js';
import PartyOverview from './PartyOverview.jsx';
import Menu from './Menu.jsx';
import Guests from './Guests.jsx';

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
          setGuests(res.data[0].guests)
        })
        .catch((err) => console.log('Error getting data in DB. Error: ', err))
    }
  }

  const addGuest = (guest) => {
    axios.post('/guests', {userId: user.sub, guest: guest})
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
          }
          if (res.data.appetizers[i]) {
            appData.push(res.data.appetizers[i].name);
          }
          if (res.data.sides[i]) {
            sideData.push(res.data.sides[i].name);
          }
          if (res.data.drinks[i]) {
            drinkData.push(res.data.drinks[i].name);
          }
          if (res.data.desserts[i]) {
            dessertData.push(res.data.desserts[i].name);
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
        <button onClick={loginWithRedirect}>Log in</button>
        <h1>let's host a dinner party.</h1>
        <h2>the theme is...</h2>
      </>
      }
      {isAuthenticated &&
        <>
          <div>
            Hello, {user.name}{'👋🏻 '}
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </button>
          </div>
          {user &&
          <div>
            <PartyOverview generateMenu={generateMenu} />
            <Menu addEntree={addEntree} addAppetizer={addAppetizer} addSide={addSide} addDrink={addDrink} addDessert={addDessert} entrees={entrees} setEntrees={setEntrees} appetizers={appetizers} setAppetizers={setAppetizers} sides={sides} setSides={setSides} drinks={drinks} setDrinks={setDrinks} desserts={desserts} setDesserts={setDesserts} getMenu={getMenu} watch={watch} setWatch={setWatch}/>
            <Guests guests={guests} setGuests={setGuests} addGuest={addGuest} watch={watch} setWatch={setWatch}/>
          </div>
          }
        </>
      }
    </>
  )
}

const StyledAppTitle = styled.h1`
  text-align: center;
`

export default App;