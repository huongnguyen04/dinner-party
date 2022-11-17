import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Typed from 'typed.js';
import { AppStyle } from '../assets/styles.js';
import TypedAnimation from './TypedAnimation.jsx';
import AuthenticatedHome from './AuthenticatedHome.jsx';

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
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </button>
          </StyledLogOutButtonAlign>
          <StyledGreeting>
            Hello, {user.name}{' 👋🏻 '}
          </StyledGreeting>
          {user && <AuthenticatedHome user={user} />}
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

export default App;