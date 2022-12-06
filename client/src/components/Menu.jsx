import React, { useState, useEffect } from 'react';
import MenuList from './MenuList.jsx';
import axios from 'axios';
import { formatInput } from './formatInput.js';

const Menu = ({ addMenuItem, deleteMenuItem, entrees, appetizers, sides, drinks, desserts }) => {

  const [entree, setEntree] = useState('');
  const [appetizer, setAppetizer] = useState('');
  const [side, setSide] = useState('');
  const [drink, setDrink] = useState('');
  const [dessert, setDessert] = useState('');

  const addEntreeClick = () => {
    addMenuItem(formatInput(entree), 'entree');
    setEntree('');
  }

  const addAppClick = () => {
    addMenuItem(formatInput(appetizer), 'appetizer');
    setAppetizer('');
  }

  const addSideClick = () => {
    addMenuItem(formatInput(side), 'side');
    setSide('');
  }

  const addDrinkClick = () => {
    addMenuItem(formatInput(drink), 'drink');
    setDrink('');
  }

  const addDessertClick = () => {
    addMenuItem(formatInput(dessert), 'dessert');
    setDessert('');
  }

  return (
    <>
      <h1>Menu</h1>

      <h3>Entrees</h3>
      <MenuList foods={entrees} category={'entree'} deleteMenuItem={deleteMenuItem} />
      <br></br>
      <div>
        <input placeholder={'add entree'} value={entree} onChange={(e) => setEntree(e.target.value)}></input>
        <button className='plus' onClick={addEntreeClick}>+</button>
      </div>
      <br></br>

      <h3>Appetizers</h3>
      <MenuList foods={appetizers} category={'appetizer'} deleteMenuItem={deleteMenuItem}/>
      <br></br>
      <div>
        <input placeholder={'add appetizer'} value={appetizer} onChange={(e) => setAppetizer(e.target.value)}></input>
        <button className='plus' onClick={addAppClick}>+</button>
      </div>
      <br></br>

      <h3>Sides</h3>
      <MenuList foods={sides} category={'side'} deleteMenuItem={deleteMenuItem}/>
      <br></br>
      <div>
        <input placeholder={'add side'} value={side} onChange={(e) => setSide(e.target.value)}></input>
        <button className='plus' onClick={addSideClick}>+</button>
      </div>
      <br></br>

      <h3>Drinks</h3>
      <MenuList foods={drinks} category={'drink'} deleteMenuItem={deleteMenuItem}/>
      <br></br>
      <div>
        <input placeholder={'add drink'} value={drink} onChange={(e) => setDrink(e.target.value)}></input>
        <button className='plus' onClick={addDrinkClick}>+</button>
      </div>
      <br></br>

      <h3>Dessert</h3>
      <MenuList foods={desserts} category={'dessert'} deleteMenuItem={deleteMenuItem}/>
      <br></br>
      <div>
        <input placeholder={'add dessert'} value={dessert} onChange={(e) => setDessert(e.target.value)}></input>
        <button className='plus' onClick={addDessertClick}>+</button>
      </div>
    </>
  );
}

export default Menu;