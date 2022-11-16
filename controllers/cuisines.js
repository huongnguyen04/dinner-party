const Cuisine = require('../models/cuisine.js');

const getCuisines = (req, res) => {
  console.log('in /cuisines route')
  Cuisine.distinct('type')
    .then((cuisines) => {
      console.log('cuisines: ', cuisines)
      res.send(cuisines);
    })
    .catch(console.error)
}

const getCuisinesData = (req, res) => {
  console.log('req.params: ', req.params.theme)
  let theme = req.params.theme;
  console.log('in /cuisines route')
  let data = {};
  Cuisine.find({'type': theme, 'category': 'entree'}, null, { limit: 3 })
    .then((cuisines) => {
      console.log('cuisines: ', cuisines)
      data.entrees = cuisines;
      Cuisine.find({'type': theme, 'category': 'appetizers'}, null, { limit: 3 })
        .then((result) => {
          data.appetizers = result;
          console.log('data: ', data)
          res.send(data);
        })

    })
    .catch(console.error)
}

module.exports = { getCuisines, getCuisinesData };