import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const AppStyle = createGlobalStyle`

button {
  background: none;
  font-family: monospace;

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