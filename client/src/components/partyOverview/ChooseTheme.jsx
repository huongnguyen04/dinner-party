import React from 'react';
import Form from './Form.jsx';

const ChooseTheme = ({ setTempTheme, cuisines }) => {
  let cuisineOptions;
  if (cuisines) {
    cuisineOptions = cuisines.map((cuisine, index) =>
      <option key={index}>{cuisine}</option>
    )
  }

  return (
    <>
      <div>Select an option and we'll generate a menu for you.</div>
      <br></br>
      <select onChange={(e) => setTempTheme(e.target.value)}>
        <option>Select a theme</option>
        {cuisineOptions}
      </select>
    </>
  )
};

export default ChooseTheme;
