import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { AppStyle } from '../assets/styles.js';
import { lightTheme, darkTheme } from "../assets/themes.js";
import { ThemeProvider } from "styled-components";
import Toggler from './Toggle.jsx';
import AuthenticatedHome from './AuthenticatedHome.jsx';
import Login from './Login.jsx';

const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithPopup, logout } = useAuth0();
  const [theme, setTheme] = useState('dark');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppStyle/>

        <Toggler theme={theme} toggleTheme={themeToggler}/>

        {!isAuthenticated &&
          <Login isLoading={isLoading} loginWithPopup={loginWithPopup} />
        }

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

const StyledGreeting = styled.div`
  text-align: center;
`

export default App;