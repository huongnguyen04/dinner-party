import React, { useState } from 'react';

const Menu = () => {
  const [entrees, setEntrees] = useState(null);
  const [appetizers, setAppetizers] = useState(null);
  const [sides, setSides] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [desserts, setDesserts] = useState(null);

  return (
    <>
      <h1>Menu</h1>

      <h4>Entrees</h4>
      <div>entree 1</div>
      <div>entree 2</div>
      <div>entree 3</div>
      <br></br>
      <div>
        <input placeholder={"add entree"} value={entrees} onChange={(e) => setEntrees(e.target.value)}></input>
        <button>+</button>
      </div>

      <h4>Appetizers</h4>
      <div>app 1</div>
      <div>app 2</div>
      <div>app 3</div>
      <br></br>
      <div>
        <input placeholder={"add app"} value={appetizers} onChange={(e) => setAppetizers(e.target.value)}></input>
        <button>+</button>
      </div>

      <h4>Sides</h4>
      <div>side 1</div>
      <div>side 2</div>
      <div>side 3</div>
      <br></br>
      <div>
        <input placeholder={"add side"} value={sides} onChange={(e) => setSides(e.target.value)}></input>
        <button>+</button>
      </div>

      <h4>Drinks</h4>
      <div>drink 1</div>
      <div>drink 2</div>
      <div>drink 3</div>
      <br></br>
      <div>
        <input placeholder={"add drink"} value={drinks} onChange={(e) => setDrinks(e.target.value)}></input>
        <button>+</button>
      </div>

      <h4>Dessert</h4>
      <div>dessert 1</div>
      <div>dessert 2</div>
      <div>dessert 3</div>
      <br></br>
      <div>
        <input placeholder={"add dessert"} value={desserts} onChange={(e) => setDesserts(e.target.value)}></input>
        <button>+</button>
      </div>
    </>
  );
}

export default Menu;