import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PartyOverview from './partyOverview/PartyOverview.jsx';
import Menu from './menu/Menu.jsx';
import Guests from './guests/Guests.jsx';
import PartyView from './PartyView.jsx';

const AuthenticatedHome = ({ user, logout }) => {

  const [viewParty, setViewParty] = useState(false);
  const [parties, setParties] = useState(null);
  const [invites, setInvites] = useState(null);
  const [currentParty, setCurrentParty] = useState(null);

  const addUser = () => {
    axios.post('/addUser', {userId: user.sub, email: user.email})
      .then((res) => console.log('res.data: ', res.data))
      .catch((err) => console.log('error adding user data. error: ', err))
  }

  useEffect(addUser, []);

  const getParties = () => {
    axios.get(`/user/${user.sub}/parties`)
      .then((res) => {
        // console.log('getParties res.data: ', res.data);
        setParties(res.data.partiesHosting);
      })
      .catch((err) => console.log('error getting user parties data'))
  }

  useEffect(getParties, []);

  const getInvitations = () => {
    axios.get(`/invitations/${user.email}`)
      .then((res) => {
        console.log('invitations: ', res.data);
        // setWatch(!watch);
        setInvites(res.data.parties);
      })
      .catch((err) => console.log('error getting invitations'))
  }

  useEffect(() => {
    getParties();
    getInvitations();
  }, []);

  let partyNames;
  if (parties && parties.length > 0) {
    partyNames = parties.map((party, index) =>
    <StyledPartyNames onClick={() => {
      setCurrentParty(party._id);
      setViewParty(true);
    }} key={index}>{party.theme}</StyledPartyNames>)
  }

  let partyInvites;
  if (invites && invites.length > 0) {
    partyInvites = invites.map((party, index) =>
      <>
        <div key={index}>
          <span>{party[0].theme}</span>
          <span> | </span>
          <span>{party[1]}</span>
        </div>
      </>
      )
  }

  const resetParties = () => {
    axios.post('/deleteParties', {userId: user.sub})
      .then((res) => {
        console.log('cleared all')
        // setWatch(!watch);
      })
      .catch((err) => console.log('error clearing all'))
  }

  return (
    <>
    <StyledAuthenticatedHome>
        {!viewParty &&
          <FlexContainer>
            <PartiesContainer>
              <h2>Your Parties</h2>
              {partyNames ? partyNames : <div>None yet... Start planning a party!</div>}
              <button onClick={() => setViewParty(true)}>New Party</button>
              <button onClick={resetParties}>Delete All Parties</button>
            </PartiesContainer>

            <InvitedPartiesContainer>
              <h2>Parties You're Invited To</h2>
              {partyInvites ? partyInvites : <div>None yet</div>}
            </InvitedPartiesContainer>
          </FlexContainer>
        }

        {viewParty && <PartyView user={user} logout={logout} currentParty={currentParty} setCurrentParty={setCurrentParty} setViewParty={setViewParty}/>}
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

const StyledPartyNames = styled.div`
  cursor: pointer;
  :hover {
    color: #FFB6C1;
  }
`
export default AuthenticatedHome;