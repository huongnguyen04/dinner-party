import React from 'react';
import ReactDOM from 'react-dom';
import ModalContent from './ModalContent.jsx';

const container = document.getElementById('root');

const Modal = ({ visible, toggle, theme, setTheme, date, setDate, host, setHost, setSelectedTheme }) => visible ? ReactDOM.createPortal(
  <div className="modal">
    <div className="modal-pop" role="dialog" aria-modal="true">
      <h3>Let's party!</h3>

      <ModalContent theme={theme} setTheme={setTheme} date={date} setDate={setDate} host={host} setHost={setHost} setSelectedTheme={setSelectedTheme}/>

      <button type="button" onClick={toggle}>Submit</button>
    </div>
    <div className="modal-overlay"></div>
  </div>, container
) : null;

export default Modal;