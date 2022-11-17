// const Cuisine = require('../models/cuisine.js');
const { Cuisine } = require('../db/connection.js');


const getCuisines = (req, res) => {
  Cuisine.distinct('type')
    .then((cuisines) => {
      console.log('cuisines: ', cuisines)
      res.send(cuisines);
    })
    .catch(console.error)
}

const getCuisinesData = (req, res) => {
  let theme = req.params.theme;
  let data = {};
  Cuisine.find({'type': theme})
    .then((result) => {
      console.log('cuisines: ', result)
      data.entrees = [];
      data.appetizers = [];
      data.sides = [];
      data.drinks = [];
      data.desserts = [];

      result.forEach((item) => {
        if (item.category === 'entree') {
          data.entrees.push(item);
        } else if (item.category === 'appetizer') {
          data.appetizers.push(item);
        } else if (item.category === 'side') {
          data.sides.push(item);
        } else if (item.category === 'drink') {
          data.drinks.push(item);
        } else if (item.category === 'dessert') {
          data.desserts.push(item);
        }
      })
      res.send(data);
    })
    .catch(console.error)
}

module.exports = { getCuisines, getCuisinesData };