import React, { useState, useEffect } from 'react';
import MenuEntry from './MenuEntry.jsx';
import axios from 'axios';

const Menu = ({ addEntree, addAppetizer, addSide, addDrink, addDessert, entrees, setEntrees, appetizers, setAppetizers, sides, setSides, drinks, setDrinks, desserts, setDesserts, getMenu, watch, setWatch }) => {

  const [entree, setEntree] = useState('');
  const [appetizer, setAppetizer] = useState('');
  const [side, setSide] = useState('');
  const [drink, setDrink] = useState('');
  const [dessert, setDessert] = useState('');

  const addEntreeClick = () => {
    setWatch(!watch);
    addEntree(entree);
    setEntree('');
  }

  const addAppClick = () => {
    setWatch(!watch);
    addAppetizer(appetizer);
    setAppetizer('');
  }

  const addSideClick = () => {
    setWatch(!watch);
    addSide(side);
    setSide('');
  }

  const addDrinkClick = () => {
    setWatch(!watch);
    addDrink(drink);
    setDrink('');
  }

  const addDessertClick = () => {
    setWatch(!watch);
    addDessert(dessert);
    setDessert('');
  }

  return (
    <>
      <h1>Menu</h1>

      <h4>Entrees</h4>
      <MenuEntry foods={entrees}/>
      <br></br>
      <div>
        <input placeholder={"add entree"} value={entree} onChange={(e) => setEntree(e.target.value)}></input>
        <button onClick={addEntreeClick}>+</button>
      </div>

      <h4>Appetizers</h4>
      <MenuEntry foods={appetizers}/>
      <br></br>
      <div>
        <input placeholder={"add app"} value={appetizer} onChange={(e) => setAppetizer(e.target.value)}></input>
        <button onClick={addAppClick}>+</button>
      </div>

      <h4>Sides</h4>
      <MenuEntry foods={sides}/>
      <br></br>
      <div>
        <input placeholder={"add side"} value={side} onChange={(e) => setSide(e.target.value)}></input>
        <button onClick={addSideClick}>+</button>
      </div>

      <h4>Drinks</h4>
      <MenuEntry foods={drinks}/>
      <br></br>
      <div>
        <input placeholder={"add drink"} value={drink} onChange={(e) => setDrink(e.target.value)}></input>
        <button onClick={addDrinkClick}>+</button>
      </div>

      <h4>Dessert</h4>
      <MenuEntry foods={desserts}/>
      <br></br>
      <div>
        <input placeholder={"add dessert"} value={dessert} onChange={(e) => setDessert(e.target.value)}></input>
        <button onClick={addDessertClick}>+</button>
      </div>
    </>
  );
}

export default Menu;