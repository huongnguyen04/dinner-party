import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { AppStyle } from '../assets/styles.js';
import PartyOverview from './PartyOverview.jsx';
import Menu from './Menu.jsx';
import Guests from './Guests.jsx';


const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
  useAuth0();

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
          <div>
            <PartyOverview/>
            <Menu/>
            <Guests/>
          </div>
        </>
      }
    </>
  )
}

const StyledAppTitle = styled.h1`
  text-align: center;
`

export default App;