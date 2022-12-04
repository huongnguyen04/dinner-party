import React from 'react';
import ReactDOM from 'react-dom';
import AddGuestContent from './AddGuestContent.jsx';
import styled from 'styled-components';

const container = document.getElementById('root');

const AddGuestModal = ({ visible, toggle, addGuest, formatInput }) => visible ? ReactDOM.createPortal(
  <div className="modal">
    <div className="modal-pop" role="dialog" aria-modal="true">
      <StyledXButtonAlign>
        <button className='xButton' type="button" onClick={() => {
          toggle();
        }}>ⓧ</button>
      </StyledXButtonAlign>

      <StyledTitle>Add A Guest</StyledTitle>

      <AddGuestContent toggle={toggle} addGuest={addGuest} formatInput={formatInput} />

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
export default AddGuestModal;