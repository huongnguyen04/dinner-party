require("dotenv").config();
const axios = require('axios');
const express = require('express');
const path = require("path");

const app = express();

// Require User model
const User = require('../models/user.js');

const api = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&`

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get(`/cuisines/:theme`, (req, res) => {
  console.log('req.params: ', req.params.theme)

  res.send('hello')
})


app.listen(3005);
console.log('Listening on port 3005');