import React from 'react';
import styled from 'styled-components';

const MenuItem = ({ item, category, deleteMenuItem }) => {

  return (
    <>
      <StyledWrapper>
        <StyledItem>{item} &nbsp;</StyledItem>
        <DeleteButton onClick={() => deleteMenuItem(item, category)}>ⓧ</DeleteButton>
      </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  div:hover + button, button:hover {
  display: inline-block;
}
`

const StyledItem = styled.div`
  display: inline-block;

`

const DeleteButton = styled.button`
  display: none;
  padding: 0px;
  border: none;
`

export default MenuItem;