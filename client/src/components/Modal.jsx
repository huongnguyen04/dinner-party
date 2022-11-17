import React from 'react';
import ReactDOM from 'react-dom';
import ModalContent from './ModalContent.jsx';
import styled from 'styled-components';

const container = document.getElementById('root');

const Modal = ({ visible, toggle, theme, setTheme, date, setDate, host, setHost, setSelectedTheme, sendPartyOverviewDetails }) => visible ? ReactDOM.createPortal(
  <div className="modal">
    <div className="modal-pop" role="dialog" aria-modal="true">
      <StyledXButtonAlign>
        <button type="button" onClick={() => {
          toggle()
        }}>x</button>
      </StyledXButtonAlign>
      <h3>Let's party!</h3>

      <ModalContent toggle={toggle} theme={theme} setTheme={setTheme} date={date} setDate={setDate} host={host} setHost={setHost} setSelectedTheme={setSelectedTheme} sendPartyOverviewDetails={sendPartyOverviewDetails}/>

    </div>
    <div className="modal-overlay"></div>
  </div>, container
) : null;


const StyledXButtonAlign = styled.div`
  position: absolute;
  right: 30px;
  padding: 10px;
`
export default Modal;