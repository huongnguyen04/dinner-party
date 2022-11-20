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

let StyledWrapper = styled.div`
  div:hover + button, button:hover {
  display: inline-block;
}
`

let StyledItem = styled.div`
  display: inline-block;

`

let DeleteButton = styled.button`
  display: none;
  padding: 0px;
  border: none;
`

export default MenuItem;