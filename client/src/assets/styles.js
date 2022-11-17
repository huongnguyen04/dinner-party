import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const AppStyle = createGlobalStyle`

body {
  margin: 10%;
  background-color: #CC8B86;
}

h1 {
  // color: #EFF1F3;
  color: white;
}

h2, h3 {
  // color: #EFF1F3;
  color: white;
}

.plus, .no-padding {
  padding: 0px;
}

button {
  background: none;
  font-family: Verdana;
  cursor: pointer;
  color: white;
  padding: 5px;
  border-radius: 5px;

}

p, div, option {
  // color: #EFF1F3;
  color: white;
  font-family: Verdana;
  font-size: 16px;
}

select {
  // color: #D8B4A0;
  font-family: Verdana;
  width: 200px;
}

input {
  // color: #D8B4A0;
  font-family: Verdana;
  width: 150px;
}

input[type=submit] {
  width: 100px;
}

`

export { AppStyle };