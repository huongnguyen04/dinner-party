require("dotenv").config();
const axios = require('axios');
const express = require('express');
const path = require("path");
const cuisineRoutes = require('../controllers/cuisines.js')
const userRoutes = require('../controllers/users.js')
const app = express();

const api = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&`

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get(`/cuisines/:theme`, cuisineRoutes.getCuisinesData);
app.get('/cuisines', cuisineRoutes.getCuisines);

app.get('/partyData/:userId', userRoutes.getPartyData);
app.post('/partyDetail', userRoutes.addPartyDetail)
app.post('/guests', userRoutes.addGuest);
app.post('/delete', userRoutes.clearMenu);

app.post('/entrees', userRoutes.addEntree);
app.post('/appetizers', userRoutes.addAppetizer);
app.post('/sides', userRoutes.addSide);
app.post('/drinks', userRoutes.addDrink);
app.post('/desserts', userRoutes.addDessert);



app.listen(3005);
console.log('Listening on port 3005');