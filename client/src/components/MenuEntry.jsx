import React from 'react';

const MenuEntry = ({ foods }) => {
  let mapped;
  if (foods.length > 0) {
    mapped = foods.map((item, index) => <div key={index}>{item}</div>)
  }
  return (
    <>
      {mapped ? mapped : null}
    </>
  )
}

export default MenuEntry;