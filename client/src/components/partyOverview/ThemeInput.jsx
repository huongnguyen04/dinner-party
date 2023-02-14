import React from 'react';

const ThemeInput = ({ tempTheme, setTempTheme }) => {

  return (
    <>
      <div>Enter your theme below.</div>
      <br></br>
      <span>Theme: </span>
      <input type='text' value={tempTheme} onChange={(e) =>
        setTempTheme(e.target.value)} required></input>
    </>
  )
};

export default ThemeInput;
