import React from 'react';
import MenuItem from './MenuItem.jsx';

const MenuList = ({ foods, category, deleteMenuItem }) => {
  let mapped;
  if (foods && foods.length > 0) {
    mapped = foods.map((item, index) => <MenuItem key={index} item={item} category={category} deleteMenuItem={deleteMenuItem}></MenuItem>)
  }
  return (
    <>
      {mapped ? mapped : null}
    </>
  )
}

export default MenuList;