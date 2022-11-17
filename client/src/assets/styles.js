import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const AppStyle = createGlobalStyle`

body {
  margin: 10%;
}

button {
  background: none;
  font-family: monospace;
  cursor: pointer;
}

p, div, option {
  color: black;
  font-family: monospace;
  font-size: 16px;
}

select, input {
  color: black;
  font-family: monospace;
}

`

export { AppStyle };