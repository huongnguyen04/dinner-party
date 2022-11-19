import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Typed from 'typed.js';
import { AppStyle } from '../assets/styles.js';
import TypedAnimation from './TypedAnimation.jsx';
import AuthenticatedHome from './AuthenticatedHome.jsx';

const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <>
      <AppStyle/>
        {isAuthenticated &&
        <>
          <StyledTitleContainer>
            <StyledAppTitle>dinner party 🥘🎉</StyledAppTitle>
              <>
                <StyledGreeting>
                  Hello, {user.name}{' 👋🏻 '}
                </StyledGreeting>
              </>
          </StyledTitleContainer>
         {user && <AuthenticatedHome user={user} logout={logout} />}
        </>
        }

      {!isAuthenticated &&
      <>
        <StyledSubTitles>
          <h1>let's host a dinner party.</h1>
          <h2>the theme is...</h2>
          <TypedAnimation/>
          <StyledButtonAlign>
            <StyledLoginButton onClick={loginWithPopup}>Sign In</StyledLoginButton>
            <StyledLoginButton onClick={()=> loginWithPopup({ action: 'signup' })}>Sign Up</StyledLoginButton>
          </StyledButtonAlign>
        </StyledSubTitles>
      </>
      }
    </>
  )
}

const StyledTitleContainer = styled.div`
  background: white;
  padding: 15px;
`
const StyledAppTitle = styled.h1`
  text-align: center;
  font-size: 42px;
  color: #904E55;
`

const StyledSubTitles = styled.div`
  text-align: center;
  padding-top: 100px;
`

const StyledGreeting = styled.div`
  text-align: center;
  color: #904E55;
`

const StyledButtonAlign = styled.div`
  margin-top: 100px;
  text-align: center;
  padding: 10px;
`

const StyledLoginButton = styled.button`
  width: 150px;
  background: white;
  color: #904E55;
`


export default App;