import React, { useState, useEffect } from 'react';

const RandomizedTheme = ({ cuisines, tempTheme, setTempTheme }) => {
  let random = cuisines[Math.floor(Math.random() * cuisines.length)];

  useEffect(() => setTempTheme(random), [])

  return (
    <>
      Your random theme is: {tempTheme}
    </>
  )
};

export default RandomizedTheme;
