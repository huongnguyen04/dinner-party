import React from 'react';
import ReactDOM from 'react-dom';
import ModalContent from './ModalContent.jsx';
import styled from 'styled-components';

const container = document.getElementById('root');

const Modal = ({ visible, toggle, setTheme, setDate, setHost, generateMenu }) => visible ? ReactDOM.createPortal(
  <div className="modal">
    <div className="modal-pop" role="dialog" aria-modal="true">
      <StyledXButtonAlign>
        <button className='xButton' type="button" onClick={() => {
          toggle()
        }}>ⓧ</button>
      </StyledXButtonAlign>
      <StyledTitle>Let's party!</StyledTitle>

      <ModalContent toggle={toggle} setTheme={setTheme} setDate={setDate} setHost={setHost} generateMenu={generateMenu}/>

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