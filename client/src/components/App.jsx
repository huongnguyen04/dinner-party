import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { AppStyle } from '../assets/styles.js';
import { lightTheme, darkTheme } from '../assets/themes.js';
import { ThemeProvider } from 'styled-components';
import Toggler from './Toggle.jsx';
import AuthenticatedHome from './AuthenticatedHome.jsx';
import Login from './Login.jsx';

const App = () => {
  const { isLoading, isAuthenticated, error, user, loginWithPopup, logout } = useAuth0();
  const [theme, setTheme] = useState('dark');
  const [viewParty, setViewParty] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);


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
        <StyledButtonContainer>
          <StyledButtons>
            {isAuthenticated &&
              <>
              <button onClick={() => {
                setViewParty(false)
                setCurrentParty(null);
              }}>Home</button>
              <button onClick={() => logout({ returnTo: window.location.origin })}>
                  Log Out
              </button>
              </>
            }
          </StyledButtons>
            <Toggler theme={theme} toggleTheme={themeToggler}/>
        </StyledButtonContainer>
        {isAuthenticated ?
          <>
            <StyledTitleContainer id='banner'>
              <StyledAppTitle>dinner party 🥘🎉</StyledAppTitle>
                <StyledGreeting>
                  Hello, {user.name}{' 👋🏻 '}
                </StyledGreeting>
            </StyledTitleContainer>
          {user && <AuthenticatedHome user={user} logout={logout} currentParty={currentParty} setCurrentParty={setCurrentParty} viewParty={viewParty} setViewParty={setViewParty} />}
          </> :
          <Login isLoading={isLoading} loginWithPopup={loginWithPopup} />
        }
      </ThemeProvider>
    </>
  )
}

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2%;
`

const StyledButtons = styled.div`
  button {
    margin: 3px;
    // color: ${({ theme }) => theme.overviewButtonText};
    color: white;
    // background-color: ${({ theme }) => theme.overviewButtonBackground};
    background-color: none;
    border: none;
    &:hover {
      box-shadow: 0 4px 5px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19);
    }
  }
`

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