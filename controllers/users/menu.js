const { User } = require('../../db/connection.js');

const addEntree = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$push': {'partiesHosting.$.entrees': req.body.menuItem}}, {returnDocument: 'after'})
    .then((data) => {
      console.log('add entree data: ', data)
      res.send('Successfully added entree to database');
    })
    .catch((err) => console.log('Error, could not add entree to database. Error: ', err));
}

const addAppetizer = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$push': {'partiesHosting.$.appetizers': req.body.menuItem}}, {returnDocument: 'after'})
    .then((data) => {
      res.send('Successfully added appetizer to database');
    })
    .catch((err) => console.log('Error, could not add appetizer to database. Error: ', err));
}

const addSide = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$push': {'partiesHosting.$.sides': req.body.menuItem}}, {returnDocument: 'after'})
    .then((data) => {
      res.send('Successfully added side to database');
    })
    .catch((err) => console.log('Error, could not add side to database. Error: ', err));
}

const addDrink = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$push': {'partiesHosting.$.drinks': req.body.menuItem}}, {returnDocument: 'after'})
    .then((data) => {
      res.send('Successfully added drink to database');
    })
    .catch((err) => console.log('Error, could not add drink to database. Error: ', err));
}

const addDessert = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$push': {'partiesHosting.$.desserts': req.body.menuItem}}, {returnDocument: 'after'})
    .then((data) => {
      res.send('Successfully added dessert to database');
    })
    .catch((err) => console.log('Error, could not add dessert to database. Error: ', err));
}

const deleteEntree = (req, res) => {
  User.updateOne({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {$pull: {'partiesHosting.$.entrees': req.body.menuItem}})
    .then(() => {
      res.send('Deleted dessert from the database!');
    })
    .catch((err) => console.log('Error, could not delete dessert from database. Error: ', err))
}

const deleteAppetizer = (req, res) => {
  User.updateOne({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {$pull: {'partiesHosting.$.appetizers': req.body.menuItem}})
    .then(() => {
      res.send('Deleted appetizer from the database!');
    })
    .catch((err) => console.log('Error, could not delete appetizer item from database. Error: ', err))
}

const deleteSide = (req, res) => {
  User.updateOne({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {$pull: {'partiesHosting.$.sides': req.body.menuItem}})
    .then(() => {
      res.send('Deleted side from the database!');
    })
    .catch((err) => console.log('Error, could not delete side from database. Error: ', err))
}

const deleteDrink = (req, res) => {
  User.updateOne({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {$pull: {'partiesHosting.$.drinks': req.body.menuItem}})
    .then(() => {
      res.send('Deleted drink from the database!');
    })
    .catch((err) => console.log('Error, could not delete drink from database. Error: ', err))
}

const deleteDessert = (req, res) => {
  User.updateOne({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {$pull: {'partiesHosting.$.desserts': req.body.menuItem}})
    .then(() => {
      res.send('Deleted dessert from the database!');
    })
    .catch((err) => console.log('Error, could not delete dessert from database. Error: ', err))
}

module.exports = { addEntree, addAppetizer, addSide, addDrink, addDessert, deleteEntree, deleteAppetizer, deleteSide, deleteDrink, deleteDessert }