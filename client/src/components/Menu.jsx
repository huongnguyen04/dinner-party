import React, { useState } from 'react';

const Menu = () => {
  const [entrees, setEntrees] = useState(null);
  const [appetizers, setAppetizers] = useState(null);
  const [sides, setSides] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [desserts, setDesserts] = useState(null);

  return(
    <>
      <h1>Menu</h1>

      <h4>Entrees</h4>
      <button>+</button>

      <h4>Appetizers</h4>
      <button>+</button>

      <h4>Sides</h4>
      <button>+</button>

      <h4>Drinks</h4>
      <button>+</button>

      <h4>Dessert</h4>
      <button>+</button>
    </>
  );
}

export default Menu;