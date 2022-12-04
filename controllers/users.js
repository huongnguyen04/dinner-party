const { User } = require('../db/connection.js');

const getPartyData = (req, res) => {
  console.log('in party data')
  let userId = req.params.userId;
  console.log('userId: ', userId)
  User.find({userId: userId})
    .then((data) => {
      console.log('party data: ', data)
      console.log('party data: ', data[0])
      res.send(data[0]);
    })
    .catch((err) => console.log('Error, could not get all party data in database. Error: ', err))
}

const addPartyDetail = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {theme: req.body.theme, date: req.body.date, host: req.body.host}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      console.log('user: ', data)
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
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {guests: {name: req.body.guestName, email: req.body.guestEmail, confirmed: req.body.confirmed }}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added guest to database');
    })
    .catch((err) => console.log('Error, could not add guest to database. Error: ', err));
}

const deleteGuest = (req, res) => {
  User.updateOne({userId: req.body.userId}, {'$pull': {guests: {'_id': req.body.guestId}}})
    .then((data) => {
      res.send('Successfully added guest to database');
    })
    .catch((err) => console.log('Error, could not add guest to database. Error: ', err));
}

const modifyGuest = (req, res) => {
  User.update({'guests._id': req.body.guestId}, {'$set': {'guests.$.confirmed': req.body.confirmed}})
    .then((data) => {
      res.send('Successfully added guest to database');
    })
    .catch((err) => console.log('Error, could not add guest to database. Error: ', err));
}

const addEntree = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {entrees: req.body.menuItem}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added entree to database');
    })
    .catch((err) => console.log('Error, could not add entree to database. Error: ', err));
}

const addAppetizer = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {appetizers: req.body.menuItem}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added appetizer to database');
    })
    .catch((err) => console.log('Error, could not add appetizer to database. Error: ', err));
}

const addSide = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {sides: req.body.menuItem}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added side to database');
    })
    .catch((err) => console.log('Error, could not add side to database. Error: ', err));
}

const addDrink = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {drinks: req.body.menuItem}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added drink to database');
    })
    .catch((err) => console.log('Error, could not add drink to database. Error: ', err));
}

const addDessert = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {desserts: req.body.menuItem}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added dessert to database');
    })
    .catch((err) => console.log('Error, could not add dessert to database. Error: ', err));
}

const deleteEntree = (req, res) => {
  User.updateOne({userId: req.body.userId}, {$pull: {entrees: req.body.menuItem}})
    .then(() => {
      res.send('Deleted dessert from the database!');
    })
    .catch((err) => console.log('Error, could not delete dessert from database. Error: ', err))
}

const deleteAppetizer = (req, res) => {
  User.updateOne({userId: req.body.userId}, {$pull: {appetizers: req.body.menuItem}})
    .then(() => {
      res.send('Deleted appetizer from the database!');
    })
    .catch((err) => console.log('Error, could not delete appetizer item from database. Error: ', err))
}

const deleteSide = (req, res) => {
  User.updateOne({userId: req.body.userId}, {$pull: {sides: req.body.menuItem}})
    .then(() => {
      res.send('Deleted side from the database!');
    })
    .catch((err) => console.log('Error, could not delete side from database. Error: ', err))
}

const deleteDrink = (req, res) => {
  User.updateOne({userId: req.body.userId}, {$pull: {drinks: req.body.menuItem}})
    .then(() => {
      res.send('Deleted drink from the database!');
    })
    .catch((err) => console.log('Error, could not delete drink from database. Error: ', err))
}

const deleteDessert = (req, res) => {
  User.updateOne({userId: req.body.userId}, {$pull: {desserts: req.body.menuItem}})
    .then(() => {
      res.send('Deleted dessert from the database!');
    })
    .catch((err) => console.log('Error, could not delete dessert from database. Error: ', err))
}

module.exports = { getPartyData, addGuest, deleteGuest, modifyGuest, addPartyDetail, clearMenu, addEntree, addAppetizer, addSide, addDrink, addDessert, deleteEntree, deleteAppetizer, deleteSide, deleteDrink, deleteDessert }