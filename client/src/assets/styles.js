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

.xButton {
  padding: 0px;
  border: none;
  font-size: 16px;
}

.nextButton {
  border: 1px solid white;
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

// loader styles

.lds-spinner {
  margin: auto;
  width: 50%;
  color: official;
  // display: inline-block;
  // position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #fff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


`

export { AppStyle };