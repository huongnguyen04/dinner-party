import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typed from 'typed.js';
import TypedAnimation from './TypedAnimation.jsx';

const Login = ({ isLoading, loginWithPopup }) => {

  return (
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
  )
}

const StyledSubTitles = styled.div`
  text-align: center;
  padding-top: 60px;
`

const StyledButtonAlign = styled.div`
  margin-top: 100px;
  text-align: center;
  padding: 10px;
`

const StyledLoginButton = styled.button`
  width: 150px;
`

export default Login;