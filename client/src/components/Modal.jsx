import React from 'react';
import ReactDOM from 'react-dom';
import ModalContent from './ModalContent.jsx';
import styled from 'styled-components';

const container = document.getElementById('root');

const Modal = ({ visible, toggle, theme, setTheme, date, setDate, host, setHost, setSelectedTheme, sendPartyOverviewDetails, watch, setWatch }) => visible ? ReactDOM.createPortal(
  <div className="modal">
    <div className="modal-pop" role="dialog" aria-modal="true">
      <StyledXButtonAlign>
        <button class='no-padding' type="button" onClick={() => {
          toggle()
        }}>x</button>
      </StyledXButtonAlign>
      <StyledTitle>Let's party!</StyledTitle>

      <ModalContent toggle={toggle} theme={theme} setTheme={setTheme} date={date} setDate={setDate} host={host} setHost={setHost} setSelectedTheme={setSelectedTheme} sendPartyOverviewDetails={sendPartyOverviewDetails} watch={watch} setWatch={setWatch}/>

    </div>
    <div className="modal-overlay"></div>
  </div>, container
) : null;

const StyledTitle = styled.h3`
  text-align: center;
`
const StyledXButtonAlign = styled.div`
  position: absolute;
  right: 30px;
  padding: 10px;
`
export default Modal;