const { User } = require('../db/connection.js');

const getPartyData = (req, res) => {
  console.log('in party data')
  let userId = req.params.userId;
  console.log('userId: ', userId)
  User.find({userId: userId})
    .then((data) => {
      console.log('party data: ', data[0])
      res.send(data[0]);
    })
    .catch((err) => console.log('Error, could not get all party data in database. Error: ', err))
}

const addPartyDetail = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {theme: req.body.theme, date: req.body.date, host: req.body.host}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added party details to database');
    })
    .catch((err) => console.log('Error, could not add party details to database. Error: ', err));
}

const clearMenu = (req, res) => {
  User.deleteMany({})
    .then(() => {
      res.send('Deleted all menu items from the database!');
    })
    .catch((err) => console.log('Error, could not delete all menu items from database. Error: ', err))
}

const addGuest = (req, res) => {
  // console.log('req.body: ', req.body)
  console.log('in addGuest handler')
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {guests: {name: req.body.guest, confirmed: req.body.confirmed }}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added guest to database');
    })
    .catch((err) => console.log('Error, could not add guest to database. Error: ', err));
}

const modifyGuest = (req, res) => {
  console.log('req.body: ', req.body)
  User.update({'guests._id': req.body.guestId}, {'$set': {'guests.$.confirmed': req.body.confirmed}})
    .then((data) => {
      res.send('Successfully added guest to database');
    })
    .catch((err) => console.log('Error, could not add guest to database. Error: ', err));
}

const addEntree = (req, res) => {
  // console.log('req.body: ', req.body)
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {entrees: req.body.entree}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added entree to database');
    })
    .catch((err) => console.log('Error, could not add entree to database. Error: ', err));
}

const addAppetizer = (req, res) => {
  // console.log('req.body: ', req.body)
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {appetizers: req.body.appetizer}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added appetizer to database');
    })
    .catch((err) => console.log('Error, could not add appetizer to database. Error: ', err));
}

const addSide = (req, res) => {
  // console.log('req.body: ', req.body)
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {sides: req.body.side}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added side to database');
    })
    .catch((err) => console.log('Error, could not add side to database. Error: ', err));
}

const addDrink = (req, res) => {
  // console.log('req.body: ', req.body)
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {drinks: req.body.drink}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added drink to database');
    })
    .catch((err) => console.log('Error, could not add drink to database. Error: ', err));
}

const addDessert = (req, res) => {
  // console.log('req.body: ', req.body)
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {desserts: req.body.dessert}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added dessert to database');
    })
    .catch((err) => console.log('Error, could not add dessert to database. Error: ', err));
}

module.exports = { getPartyData, addGuest, modifyGuest, addPartyDetail, clearMenu, addEntree, addAppetizer, addSide, addDrink, addDessert }