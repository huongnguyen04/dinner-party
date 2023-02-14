import React, { useState, useEffect } from 'react'

const RandomizedTheme = ({ cuisines, setTempTheme }) => {
  let random = cuisines[Math.floor(Math.random() * cuisines.length)];

  useEffect(() => setTempTheme(random), [])

  return (
    <>
    your random theme is: {random}
    </>
  )
};

export default RandomizedTheme;
