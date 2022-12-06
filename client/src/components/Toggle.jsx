import React from 'react'
import styled from "styled-components"

const Toggle = ({theme,  toggleTheme }) => {
  return (
    <StyledButtonContainer>
      <Button onClick={toggleTheme}>☾</Button>
    </StyledButtonContainer>
    );
  };

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:1.5rem;
  padding: 0.6rem;
  transform: rotate(-30deg);
  }
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`
export default Toggle;