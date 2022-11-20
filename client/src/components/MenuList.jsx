import React from 'react';
import MenuItem from './MenuItem.jsx';

const MenuList = ({ foods }) => {
  let mapped;
  if (foods && foods.length > 0) {
    mapped = foods.map((item, index) => <MenuItem key={index} item={item}></MenuItem>)
  }
  return (
    <>
      {mapped ? mapped : null}
    </>
  )
}

export default MenuList;