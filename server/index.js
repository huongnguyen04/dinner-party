require('dotenv').config();
const express = require('express');
const path = require('path');
const cuisineRoutes = require('../controllers/cuisines.js');
const guestRoutes = require('../controllers/users/guest.js');
const invitationRoutes = require('../controllers/users/invitation.js');
const menuRoutes = require('../controllers/users/menu.js');
const partyRoutes = require('../controllers/users/party.js');

const app = express();

const api = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&`

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/cuisines/:theme', cuisineRoutes.getCuisinesData);
app.get('/cuisines', cuisineRoutes.getCuisines);

app.get('/partyData/:userId/:partyId', partyRoutes.getPartyData);
app.post('/addUser', partyRoutes.addUserDetail);
app.post('/newParty', partyRoutes.addParty);
app.get('/user/:userId/parties', partyRoutes.getParties);
app.post('/partyDetail', partyRoutes.addPartyDetail)
app.post('/deleteParties', partyRoutes.deleteParties);
app.post('/deleteParty', partyRoutes.clearParty);

app.post('/addGuest', guestRoutes.addGuest);
app.post('/deleteGuest', guestRoutes.deleteGuest);
app.put('/guest', guestRoutes.modifyGuest);

app.post('/addEntree', menuRoutes.addEntree);
app.post('/addAppetizer', menuRoutes.addAppetizer);
app.post('/addSide', menuRoutes.addSide);
app.post('/addDrink', menuRoutes.addDrink);
app.post('/addDessert', menuRoutes.addDessert);

app.post('/deleteEntree', menuRoutes.deleteEntree);
app.post('/deleteAppetizer', menuRoutes.deleteAppetizer);
app.post('/deleteSide', menuRoutes.deleteSide);
app.post('/deleteDrink', menuRoutes.deleteDrink);
app.post('/deleteDessert', menuRoutes.deleteDessert);

app.get('/invitations/:userEmail', invitationRoutes.getInvitations);

app.listen(3005);
console.log('Listening on port 3005');