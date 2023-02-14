import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PartyOverview from './partyOverview/PartyOverview.jsx';
import Menu from './menu/Menu.jsx';
import Guests from './guests/Guests.jsx';
import PartyView from './PartyView.jsx';
import PartyHosting from './PartyHosting.jsx';
import PartyInvited from './PartyInvited.jsx';

const AuthenticatedHome = ({ user, logout, viewParty, setViewParty, currentParty, setCurrentParty }) => {
  const [parties, setParties] = useState(null);
  const [invites, setInvites] = useState(null);
  const [partyListModified, setPartyListModified] = useState(false);

  const addUser = () => {
    axios.post('/addUser', {userId: user.sub, email: user.email})
      .then((res) => console.log('res.data: ', res.data))
      .catch((err) => console.log('error adding user data. error: ', err))
  }

  useEffect(addUser, []);

  const getParties = () => {
    axios.get(`/user/${user.sub}/parties`)
      .then((res) => {
        console.log('getParties res.data: ', res.data);
        let parties = [];
        res.data.forEach((party) => {
          if (party.theme) {
            parties.push(party);
          }
        })
        setParties(parties);
      })
      .catch((err) => console.log('error getting user parties data'))
  }

  useEffect(getParties, [partyListModified]);

  const getInvitations = () => {
    axios.get(`/invitations/${user.email}`)
      .then((res) => {
        console.log('invitations: ', res.data);
        setInvites(res.data);
      })
      .catch((err) => console.log('error getting invitations'))
  }

  useEffect(getInvitations, []);

  let partyNames;
  if (parties && parties.length > 0) {
    partyNames = parties.map((party, index) =>
      <PartyHosting key={index} party={party} setCurrentParty={setCurrentParty} setViewParty={setViewParty}/>
    )
  }

  let partyInvites;
  if (invites && invites.length > 0) {
    partyInvites = invites.map((party, index) =>
      <PartyInvited key={index} party={party}/>
      )
  }

  const resetParties = () => {
    axios.post('/deleteParties', {userId: user.sub})
      .then((res) => {
        console.log('cleared all');
        setPartyListModified(!partyListModified);
      })
      .catch((err) => console.log('error clearing all'))
  }

  return (
    <>
    <StyledAuthenticatedHome>
      {!viewParty ?
        <FlexContainer>
          <PartiesContainer>
            <u><h2>Parties You're Hosting</h2></u>
            <FlexPartiesContainer>
              {partyNames ? partyNames : <div>None yet... Start planning a party!</div>}
            <StyledButtonContainer>
              <NewPartyBtn onClick={() => setViewParty(true)}>New Party</NewPartyBtn>
              <button onClick={resetParties}>Delete All Parties</button>
            </StyledButtonContainer>
            </FlexPartiesContainer>
          </PartiesContainer>

          <InvitedPartiesContainer>
            <u><h2>Parties You're Invited To</h2></u>
            <FlexPartiesContainer>
              {partyInvites ? partyInvites : <div>None yet</div>}
            </FlexPartiesContainer>
          </InvitedPartiesContainer>
        </FlexContainer>
      :
      <PartyView user={user} logout={logout} currentParty={currentParty} setCurrentParty={setCurrentParty} setViewParty={setViewParty} partyListModified={partyListModified} setPartyListModified={setPartyListModified}/>}
    </StyledAuthenticatedHome>
    </>
  )
}

const StyledAuthenticatedHome = styled.div`
  position: relative;
  padding-top: 30px;
`

const NewPartyBtn = styled.button`
  color: #904E55;
  background-color: white;
`

const StyledButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 20px;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const PartiesContainer = styled.div`
  width: 50%;
`

const FlexPartiesContainer = styled.div`
  display: grid;
  row-gap: 20px;
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
  grid-template-areas: "menu guests";
`

const StyledMenu = styled.div`
  grid-area: menu;
`

const StyledGuests = styled.div`
  grid-area: guests;
`

export default AuthenticatedHome;