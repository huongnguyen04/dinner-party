import React, { useState } from 'react';
import styled from 'styled-components';

const HomeView = () => {

  return (
    <>
    <FlexContainer>
      <PartiesContainer>
        <h2>Your Parties</h2>
        <div>None yet... Start planning a party!</div>
        <button>New Party</button>
      </PartiesContainer>
      <InvitedPartiesContainer>
        <h2>Parties You're Invited To</h2>
        <div>None yet</div>
      </InvitedPartiesContainer>
    </FlexContainer>
    </>
  )
}

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

export default HomeView;