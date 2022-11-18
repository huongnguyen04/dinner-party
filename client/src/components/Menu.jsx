import React, { useState, useEffect } from 'react';
import MenuEntry from './MenuEntry.jsx';
import axios from 'axios';

const Menu = ({ addEntree, addAppetizer, addSide, addDrink, addDessert, entrees, appetizers, sides, drinks, desserts }) => {

  const [entree, setEntree] = useState('');
  const [appetizer, setAppetizer] = useState('');
  const [side, setSide] = useState('');
  const [drink, setDrink] = useState('');
  const [dessert, setDessert] = useState('');

  const addEntreeClick = () => {
    addEntree(formatInput(entree));
    setEntree('');
  }

  const addAppClick = () => {
    addAppetizer(formatInput(appetizer));
    setAppetizer('');
  }

  const addSideClick = () => {
    addSide(formatInput(side));
    setSide('');
  }

  const addDrinkClick = () => {
    addDrink(formatInput(drink));
    setDrink('');
  }

  const addDessertClick = () => {
    addDessert(formatInput(dessert));
    setDessert('');
  }

  const formatInput = (str) => {
    var result = '';
    var splitStr = str.split(' ');
    if (splitStr[splitStr.length - 1] === '') {
      splitStr.pop();
    }
    splitStr.forEach((word, index) => {
      result+= word[0].toUpperCase() + word.substring(1) + ' ' ;
    });
    return result;
  }

  return (
    <>
      <h1>Menu</h1>

      <h3>Entrees</h3>
      <MenuEntry foods={entrees}/>
      <br></br>
      <div>
        <input placeholder={'add entree'} value={entree} onChange={(e) => setEntree(e.target.value)}></input>
        <button className='plus' onClick={addEntreeClick}>+</button>
      </div>
      <br></br>

      <h3>Appetizers</h3>
      <MenuEntry foods={appetizers}/>
      <br></br>
      <div>
        <input placeholder={'add appetizer'} value={appetizer} onChange={(e) => setAppetizer(e.target.value)}></input>
        <button className='plus' onClick={addAppClick}>+</button>
      </div>
      <br></br>

      <h3>Sides</h3>
      <MenuEntry foods={sides}/>
      <br></br>
      <div>
        <input placeholder={'add side'} value={side} onChange={(e) => setSide(e.target.value)}></input>
        <button className='plus' onClick={addSideClick}>+</button>
      </div>
      <br></br>

      <h3>Drinks</h3>
      <MenuEntry foods={drinks}/>
      <br></br>
      <div>
        <input placeholder={'add drink'} value={drink} onChange={(e) => setDrink(e.target.value)}></input>
        <button className='plus' onClick={addDrinkClick}>+</button>
      </div>
      <br></br>

      <h3>Dessert</h3>
      <MenuEntry foods={desserts}/>
      <br></br>
      <div>
        <input placeholder={'add dessert'} value={dessert} onChange={(e) => setDessert(e.target.value)}></input>
        <button className='plus' onClick={addDessertClick}>+</button>
      </div>
    </>
  );
}

export default Menu;