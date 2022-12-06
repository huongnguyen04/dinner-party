require("dotenv").config();
const express = require('express');
const path = require("path");
const cuisineRoutes = require('../controllers/cuisines.js')
const userRoutes = require('../controllers/users.js')
const app = express();

const api = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&`

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/cuisines/:theme', cuisineRoutes.getCuisinesData);
app.get('/cuisines', cuisineRoutes.getCuisines);

app.get('/partyData/:userId/:partyId', userRoutes.getPartyData);
app.post('/addUser', userRoutes.addUserDetail);
app.post('/newParty', userRoutes.addParty);
app.get('/user/:userId/parties', userRoutes.getParties);
app.post('/partyDetail', userRoutes.addPartyDetail)
app.post('/addGuest', userRoutes.addGuest);
app.post('/deleteGuest', userRoutes.deleteGuest);
app.put('/guest', userRoutes.modifyGuest);
app.post('/deleteParties', userRoutes.deleteParties);
app.post('/deleteParty', userRoutes.clearParty);

app.post('/addEntree', userRoutes.addEntree);
app.post('/addAppetizer', userRoutes.addAppetizer);
app.post('/addSide', userRoutes.addSide);
app.post('/addDrink', userRoutes.addDrink);
app.post('/addDessert', userRoutes.addDessert);

app.post('/deleteEntree', userRoutes.deleteEntree);
app.post('/deleteAppetizer', userRoutes.deleteAppetizer);
app.post('/deleteSide', userRoutes.deleteSide);
app.post('/deleteDrink', userRoutes.deleteDrink);
app.post('/deleteDessert', userRoutes.deleteDessert);

app.listen(3005);
console.log('Listening on port 3005');