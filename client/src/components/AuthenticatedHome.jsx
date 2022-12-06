import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PartyOverview from './partyOverview/PartyOverview.jsx';
import Menu from './menu/Menu.jsx';
import Guests from './guests/Guests.jsx';
import AddPartyView from './AddPartyView.jsx';

const AuthenticatedHome = ({ user, logout }) => {

  const [viewParty, setViewParty] = useState(false);
  const [parties, setParties] = useState(null);
  const [currentParty, setCurrentParty] = useState(null);

  const addUser = () => {
    axios.post(`/addUser`, {userId: user.sub, email: user.email})
      .then((res) => console.log('res.data: ', res.data))
      .catch((err) => console.log('error adding user data. error: ', err))
  }

  useEffect(addUser, []);

  const getParties = () => {
    axios.get(`/user/${user.sub}/parties`)
      .then((res) => {
        console.log('getParties res.data: ', res.data);
        setParties(res.data.partiesHosting);
      })
      .catch((err) => console.log('error getting user parties data'))
  }

  useEffect(getParties, []);

  let partyNames;
  if (parties && parties.length > 0) {
    partyNames = parties.map((party, index) =>
    <div onClick={() => {
      console.log('party._id in map: ', party._id)
      setCurrentParty(party._id);
      setViewParty(true);
    }} key={index}>{party.theme}</div>)
  }


  return (
    <>
    <StyledAuthenticatedHome>
        {!viewParty &&
          <FlexContainer>
            <PartiesContainer>
              <h2>Your Parties</h2>
              {partyNames ? partyNames : <div>None yet... Start planning a party!</div> }
              <button onClick={() => setViewParty(true)}>New Party</button>
            </PartiesContainer>

            <InvitedPartiesContainer>
              <h2>Parties You're Invited To</h2>
              <div>None yet</div>
            </InvitedPartiesContainer>
          </FlexContainer>
        }

        {viewParty && <AddPartyView user={user} logout={logout} currentParty={currentParty} setCurrentParty={setCurrentParty} setViewParty={setViewParty}/>}
    </StyledAuthenticatedHome>
    </>
  )
}

const StyledAuthenticatedHome = styled.div`
  position: relative;
  padding-top: 30px;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const PartiesContainer = styled.div`
  width: 50%;
`

const InvitedPartiesContainer = styled.div`
  width: 50%;
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