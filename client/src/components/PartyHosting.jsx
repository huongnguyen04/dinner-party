import React from 'react';
import styled from 'styled-components';

const PartyHosting = ({party, setCurrentParty, setViewParty}) => {
  return (
    <StyledPartyName onClick={() => {
      setCurrentParty(party._id);
      setViewParty(true);
    }}>
      <b>{party.date} </b>{party.theme}
    </StyledPartyName>
  );
};

const StyledPartyName = styled.div`
  cursor: pointer;
  :hover {
    color: #FFB6C1;
  }
`

export default PartyHosting;