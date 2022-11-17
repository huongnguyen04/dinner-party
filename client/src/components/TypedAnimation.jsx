import React, { useState, useEffect } from 'react';
import Typed from 'typed.js';

const TypedAnimation = () => {
	// Create reference to store the DOM element containing the animation
	const el = React.useRef(null);
  // Create reference to store the Typed instance itself
	const typed = React.useRef(null);

  React.useEffect(() => {
    const options = {
    	strings: [
        'wine and cheese night',
        'italian cuisine',
        'harry potter',
        'french cuisine',
        'sushi',
        'asian cuisine',
        'christmas',
        'whatever you want'
      ],
      typeSpeed: 70,
      backSpeed: 70,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
  }, [])

  return (
    <div className="wrap">
      <div className="type-wrap">
        <span style={{ whiteSpace: 'pre' }} ref={el} />
      </div>
    </div>
  );
}

export default TypedAnimation;