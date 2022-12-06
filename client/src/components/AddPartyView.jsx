import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PartyOverview from './PartyOverview.jsx';
import Menu from './Menu.jsx';
import Guests from './Guests.jsx';

const AddPartyView = ({ user, logout, setViewParty, currentParty, setCurrentParty }) => {

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

  const getMenu = () => {
    if (user && currentParty) {
      axios.get(`/partyData/${user.sub}/${currentParty}`)
        .then((res) => {
          console.log('res.data current party: ',res.data);
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
  const createNewParty = () => {
    if (!currentParty) {
      axios.post('/newParty', {userId: user.sub})
        .then((res) => {
          setCurrentParty(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(createNewParty, []);


  const sendPartyOverviewDetails = () => {
    if (currentParty && theme && date && host) {
      axios.post('/partyDetail', {userId: user.sub, partyId: currentParty, theme: theme, date: date.toString(), host: host})
        .then((res) => console.log('added party details'))
        .catch((err) => console.log(err));
    }
  }

  useEffect(sendPartyOverviewDetails, [theme]);

  const addGuest = (guestName, guestEmail) => {
    axios.post('/addGuest', {userId: user.sub, partyId: currentParty, guestName: guestName, guestEmail, guestEmail, confirmed: false})
      .then((res) => {
        console.log('added guest');
        setWatch(!watch);
      })
      .catch((err) => console.log(err));
  }

  const deleteGuest = (guest) => {
    axios.post('/deleteGuest', {userId: user.sub, partyId: currentParty, guestId: guest._id})
      .then((res) => {
        console.log('deleted guest');
        setWatch(!watch);
      })
      .catch((err) => console.log('guest could not be deleted'))
  }

  const modifyGuest = (guest) => {
    axios.put('/guest', {userId: user.sub, partyId: currentParty, guestId: guest._id, confirmed: !guest.confirmed})
      .then((res) => {
        console.log('guest has been modified');
        setWatch(!watch);
      })
      .catch((err) => console.log('guest could not be modified'))
  }

  const addMenuItem = (menuItem, category) => {
    axios.post(`/add${category}`, {userId: user.sub, partyId: currentParty, menuItem: menuItem})
      .then((res) => {
        console.log('added entry');
        setWatch(!watch);
      })
      .catch((err) => console.log(err));
  }

  const deleteMenuItem = (menuItem, category) => {
    axios.post(`/delete${category}`, {userId: user.sub, partyId: currentParty, menuItem: menuItem})
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

  const formatInput = (str) => {
    var result = '';
    var splitStr = str.split(' ');
    if (splitStr[splitStr.length - 1] === '') {
      splitStr.pop();
    }
    splitStr.forEach((word, index) => {
      result+= word[0].toUpperCase() + word.substring(1) + ' ' ;
    });
    return result.substring(0, result.length - 1);
  }

  useEffect(getMenu, [user, watch]);

  return (
    <>
      <PartyOverview theme={theme} setTheme={setTheme} host={host} setHost={setHost} date={date} setDate={setDate} generateMenu={generateMenu} sendPartyOverviewDetails={sendPartyOverviewDetails} watch={watch} setWatch={setWatch} logout={logout} setViewParty={setViewParty} />
      <StyledContainer>
        <StyledMenu>
          <Menu addMenuItem={addMenuItem} deleteMenuItem={deleteMenuItem} entrees={entrees} appetizers={appetizers} sides={sides} drinks={drinks} desserts={desserts}/>
        </StyledMenu>
        <StyledGuests>
          <Guests guests={guests} setGuests={setGuests} addGuest={addGuest} modifyGuest={modifyGuest} watch={watch} setWatch={setWatch} deleteGuest={deleteGuest} />
        </StyledGuests>
      </StyledContainer>
    </>
  )
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: 'menu guests';
`

const StyledMenu = styled.div`
  grid-area: menu;
`

const StyledGuests = styled.div`
  grid-area: guests;
`

export default AddPartyView;