import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Typed from 'typed.js';
import { AppStyle } from '../assets/styles.js';
import { lightTheme, darkTheme } from "../assets/themes.js";
import { ThemeProvider } from "styled-components";
import Toggler from './Toggle.jsx';
import TypedAnimation from './TypedAnimation.jsx';
import AuthenticatedHome from './AuthenticatedHome.jsx';

const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithPopup, logout } = useAuth0();
  const [theme, setTheme] = useState('dark');

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppStyle/>

        <Toggler theme={theme} toggleTheme={themeToggler}/>

        {isAuthenticated &&
        <>
          <StyledTitleContainer id='banner'>
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
          {isLoading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
          {!isLoading &&
            <StyledSubTitles>
              <h1>let's host a dinner party.</h1>
              <h2>the theme is...</h2>
              <TypedAnimation/>
              <StyledButtonAlign>
                <StyledLoginButton onClick={loginWithPopup}>Sign In</StyledLoginButton>
                {/* <StyledLoginButton onClick={()=> loginWithPopup({ action: 'signup' })}>Sign Up</StyledLoginButton> */}
              </StyledButtonAlign>
            </StyledSubTitles>
          }
        </>
      }
      </ThemeProvider>
    </>
  )
}

const StyledTitleContainer = styled.div`
  padding: 15px;
  height: 200px;
  text-align: center;
`
const StyledAppTitle = styled.h1`
  padding-top: 30px;
  font-size: 50px;
`

const StyledSubTitles = styled.div`
  text-align: center;
  padding-top: 60px;
`

const StyledGreeting = styled.div`
  text-align: center;
`

const StyledButtonAlign = styled.div`
  margin-top: 100px;
  text-align: center;
  padding: 10px;
`

const StyledLoginButton = styled.button`
  width: 150px;
`


export default App;