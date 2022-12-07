const { User } = require('../../db/connection.js');

const addGuest = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$push': {'partiesHosting.$.guests': {name: req.body.guestName, email: req.body.guestEmail, confirmed: req.body.confirmed}}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added guest to database');
    })
    .catch((err) => console.log('Error, could not add guest to database. Error: ', err));
}

const deleteGuest = (req, res) => {
  User.updateOne({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$pull': {'partiesHosting.$.guests': {'_id': req.body.guestId}}})
    .then((data) => {
      res.send('Successfully added guest to database');
    })
    .catch((err) => console.log('Error, could not add guest to database. Error: ', err));
}

const modifyGuest = (req, res) => {
  User.findOneAndUpdate(
    {userId: req.body.userId},
    {'$set': {'partiesHosting.$[e1].guests.$[e2].confirmed': req.body.confirmed}}, {arrayFilters: [{'e1._id': req.body.partyId}, {'e2._id': req.body.guestId}]})
      .then((data) => {
        res.send('Successfully modified guest confirmation in database');
      })
      .catch((err) => console.log('Error, could not modify guest confirmation in database. Error: ', err));
}

module.exports = { addGuest, deleteGuest, modifyGuest }