const { User } = require('../db/connection.js');

const getPartyData = (req, res) => {
  console.log('in party data')
  let userId = req.params.userId;
  console.log('userId: ', userId)
  User.find({userId: userId})
    .then((data) => {
      console.log('party data: ', data)
      res.send(data);
    })
    .catch(console.error)
}

const addPartyDetail = (req, res) => {

}

const addGuest = (req, res) => {
  // console.log('req.body: ', req.body)
  console.log('in addGuest handler')
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {guests: {name: req.body.guest, confirmed: true }}}, {returnDocument: 'after', upsert: true})
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

module.exports = { getPartyData, addGuest, addPartyDetail, addEntree, addAppetizer, addSide, addDrink, addDessert }