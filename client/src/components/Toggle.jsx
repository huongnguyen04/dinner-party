import React from 'react';
import styled from 'styled-components';

const Toggle = ({theme,  toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>☾</Button>
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
  transform-origin: bottom left;
  user-select: none;
  }
`

export default Toggle;