import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const AppStyle = createGlobalStyle`

body {
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: #904E55;
  width: 900px;
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

.themeSelect {
  width: 150px;
}

input[type=submit] {
  width: 100px;
}

form {
  text-align: center;
}

`

export { AppStyle };