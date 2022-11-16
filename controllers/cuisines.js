const express = require('express');
const router = express.Router();
const Cuisine = require('../models/cuisine.js');

router.get('/cuisines', (req, res) => {
  Cuisine.find({})
    .then((cuisines) => {
      res.send(cuisines);
    })
    .catch(console.error)
})