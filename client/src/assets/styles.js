import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const AppStyle = createGlobalStyle`

body {
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: ${({ theme }) => theme.body};
  width: 900px;
}

border {
  ${({ theme }) => theme.border};
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
  margin-top: 50px;
}

button {
  background: ${({ theme }) => theme.buttonBackground};
  font-family: Verdana;
  cursor: pointer;
  color: ${({ theme }) => theme.buttonText};
  padding: 5px;
  border-radius: 5px;
}

#banner {
  background: ${({ theme }) => theme.bannerBackground};
}

#banner > h1, #banner > div {
  color: ${({ theme }) => theme.bannerText};
}

#overviewBanner {
  border:  ${({ theme }) => theme.overviewBannerBorder};
}

h1, h2, h3, h4 {
  color: ${({ theme }) => theme.text};
  font-family: Verdana;
}

p, div, option, span {
  color: ${({ theme }) => theme.text};
  font-family: Verdana;
  font-size: 16px;
}

select {
  font-family: Verdana;
  width: 200px;
}

.selectTheme {
  width: 155px;
}

input {
  font-family: Verdana;
  width: 150px;
}

.themeInput {
  width: 148px;
}

input[type=submit] {
  width: 100px;
  background: none;
  font-family: Verdana;
  cursor: pointer;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid white;
}

.modal-pop {
  background: #904E55;
  border: 2px solid #aaa;
  border-radius: 5px;
  z-index: 2;
  /* max-width: 420px; */
  min-width: 500px;
  min-height: 250px;
  margin: auto;
  padding: 1em 2em 2em;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgb(0, 0, 0);
  opacity: 0.75;
}

form {
  text-align: center;
}

// loader styles

.lds-spinner {
  margin: auto;
  width: 50%;
  color: official;
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