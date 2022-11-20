import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PartyOverview from './PartyOverview.jsx';
import Menu from './Menu.jsx';
import Guests from './Guests.jsx';

const AuthenticatedHome = ({ user, logout }) => {
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const [host, setHost] = useState('');
  const [entrees, setEntrees] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  const [sides, setSides] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [guests, setGuests] = useState();
  const [watch, setWatch] = useState(true);

  console.log('user: ', user)
  if (guests && guests.length > 0) {
    console.log('guests: ', guests[0]._id)
  }

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
          setTheme(res.data.theme);
          setDate(res.data.date);
          setHost(res.data.host);
          let tempGuestList = [];
          res.data.guests.forEach((guest)=> {
            if (guest.confirmed) {
              tempGuestList.push(guest);
            }
          });
          res.data.guests.forEach((guest)=> {
            if (!guest.confirmed) {
              tempGuestList.push(guest);
            }
          })
          setGuests(tempGuestList);
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
    if (theme && date && host) {
      axios.post('/partyDetail', {userId: user.sub, theme: theme, date: date.toString(), host: host})
        .then((res) => console.log('added party details'))
        .catch((err) => console.log(err));
    }
  }

  useEffect(sendPartyOverviewDetails, [theme]);

  const addGuest = (guest) => {
    axios.post('/guests', {userId: user.sub, guest: guest, confirmed: false})
      .then((res) => {
        console.log('added guest');
        setWatch(!watch);
      })
      .catch((err) => console.log(err));
  }

  const modifyGuest = (guest) => {
    axios.put('/guest', {userId: user.sub, guestId: guest._id, confirmed: !guest.confirmed})
      .then((res) => {
        console.log('guest has been modified');
        setWatch(!watch);
      })
      .catch((err) => console.log('guest could not be modified'))
  }

  const addMenuItem = (menuItem, category) => {
    axios.post(`/add${category}`, {userId: user.sub, menuItem: menuItem})
      .then((res) => {
        console.log('added entry');
        setWatch(!watch);
      })
      .catch((err) => console.log(err));
  }

  const deleteMenuItem = (menuItem, category) => {
    axios.post(`/delete${category}`, {userId: user.sub, menuItem: menuItem})
      .then((res) => {
        console.log('deleted entry');
        setWatch(!watch);
      })
      .catch((err) => console.log(err));
  }


  const generateMenu = (selectedTheme) => {
    if (selectedTheme) {
      axios.get(`/cuisines/${selectedTheme}`)
        .then((res) => {
          for (let i = 0; i < 3; i++) {
            if (res.data.entrees[i]) {
              addMenuItem(res.data.entrees[i].name, 'entree')
            }
            if (res.data.appetizers[i]) {
              addMenuItem(res.data.appetizers[i].name, 'appetizer');
            }
            if (res.data.sides[i]) {
              addMenuItem(res.data.sides[i].name, 'side');
            }
            if (res.data.drinks[i]) {
              addMenuItem(res.data.drinks[i].name, 'drink');
            }
            if (res.data.desserts[i]) {
              addMenuItem(res.data.desserts[i].name, 'dessert');
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
    <StyledAuthenticatedHome>
        <PartyOverview theme={theme} setTheme={setTheme} host={host} setHost={setHost} date={date} setDate={setDate} generateMenu={generateMenu} sendPartyOverviewDetails={sendPartyOverviewDetails} watch={watch} setWatch={setWatch} logout={logout} />
        <StyledContainer>
          <StyledMenu>
            <Menu addMenuItem={addMenuItem} deleteMenuItem={deleteMenuItem} entrees={entrees} appetizers={appetizers} sides={sides} drinks={drinks} desserts={desserts} />
          </StyledMenu>
          <StyledGuests>
            <Guests guests={guests} setGuests={setGuests} addGuest={addGuest} modifyGuest={modifyGuest} watch={watch} setWatch={setWatch} />
          </StyledGuests>
        </StyledContainer>
    </StyledAuthenticatedHome>
  )
}

const StyledAuthenticatedHome = styled.div`
  position: relative;
  padding-top: 30px;
`

const StyledResetButton = styled.div`
  position: relative;
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

export default AuthenticatedHome;