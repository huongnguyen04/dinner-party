import React, { useState } from 'react'

const ThemeInput = ({ tempTheme, setTempTheme }) => {

  return (
    <>
      <span>Theme: </span>
      <input type='text' value={tempTheme} onChange={(e) => {
        setTempTheme(e.target.value);
      }
        } required></input>
    </>
  )
};

export default ThemeInput;
