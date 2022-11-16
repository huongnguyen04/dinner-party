import React, { useState } from 'react';
import MenuEntry from './MenuEntry.jsx';

const Menu = () => {
  const [entrees, setEntrees] = useState(['entree1', 'entree2', 'entree3']);
  const [appetizers, setAppetizers] = useState(['app1', 'app2', 'app3']);
  const [sides, setSides] = useState(['side1', 'side2', 'side3']);
  const [drinks, setDrinks] = useState(['drink1', 'drink2', 'drink3']);
  const [desserts, setDesserts] = useState(['dessert1', 'dessert2', 'dessert3']);

  const [entree, setEntree] = useState('');
  const [appetizer, setAppetizer] = useState('');
  const [side, setSide] = useState('');
  const [drink, setDrink] = useState('');
  const [dessert, setDessert] = useState('');

  const addEntreeClick = () => {
    let copy = entrees.slice();
    copy.push(entree);
    setEntrees(copy);
    setEntree('');
  }

  const addAppClick = () => {
    let copy = appetizers.slice();
    copy.push(appetizer);
    setAppetizers(copy);
    setAppetizer('');
  }

  const addSideClick = () => {
    let copy = sides.slice();
    copy.push(side);
    setSides(copy);
    setSide('');
  }

  const addDrinkClick = () => {
    let copy = drinks.slice();
    copy.push(drink);
    setDrinks(copy);
    setDrink('');
  }

  const addDessertClick = () => {
    let copy = desserts.slice();
    copy.push(dessert);
    setDesserts(copy);
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
      <MenuEntry foods={drinks}/>
      <br></br>
      <div>
        <input placeholder={"add dessert"} value={dessert} onChange={(e) => setDessert(e.target.value)}></input>
        <button onClick={addDessertClick}>+</button>
      </div>
    </>
  );
}

export default Menu;