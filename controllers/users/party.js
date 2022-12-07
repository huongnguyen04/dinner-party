const { User } = require('../../db/connection.js');

const addUserDetail = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {email: req.body.email}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added user details to database');
    })
    .catch((err) => console.log('Error, could not add user details to database. Error: ', err));
}

const getParties = (req, res) => {
  let parties = [];
  User.find({userId: req.params.userId})
    .then((data) => {
      parties = data[0].partiesHosting;
      parties.sort(function(a,b) {
        return new Date(a.date) - new Date(b.date);
      })
      res.send(data[0].partiesHosting);
    })
    .catch((err) => console.log('Error, could not get all party data in database. Error: ', err))
}

const getPartyData = (req, res) => {
  User.find({'partiesHosting._id': req.params.partyId}, {'partiesHosting.$': 1})
    .then((data) => {
      // console.log('party data: ', data[0].partiesHosting[0]);
      if (data[0].partiesHosting[0]) {
        res.send(data[0].partiesHosting[0]);
      }
    })
    .catch((err) => console.log('Error, could not get party data in database. Error: ', err))
}

const addParty = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {'$push': {'partiesHosting': {created: true}}}, {returnDocument: 'after', upsert: true})
      .then((data) => {
        console.log('added new party')
        let newPartyId = data.partiesHosting[data.partiesHosting.length - 1]._id;
        res.send(newPartyId);
      })
      .catch((err) => console.log('Error, could not add new party to database. Error: ', err));
}

const addPartyDetail = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId, 'partiesHosting._id': req.body.partyId}, {'$set': {'partiesHosting.$.theme': req.body.theme, 'partiesHosting.$.date': req.body.date, 'partiesHosting.$.host': req.body.host}}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      // console.log('added party data: ', data)
      res.send('Successfully added party details to database');
    })
    .catch((err) => console.log('Error, could not add party details to database. Error: ', err));
}

const deleteParties = (req, res) => {
  User.deleteMany({userId: req.body.userId})
    .then(() => {
      res.send('Deleted all user parties from the database!');
    })
    .catch((err) => console.log('Error, could not delete all user parties from database. Error: ', err))
}

const clearParty = (req, res) => {
  User.updateOne({userId: req.body.userId}, {'$pull': {partiesHosting: {_id: req.body.partyId}}})
    .then(() => {
      res.send('Deleted all party info from the database!');
    })
    .catch((err) => console.log('Error, could not delete all party info from database. Error: ', err))
}

module.exports = { getPartyData, getParties, addUserDetail, deleteParties, addParty, addPartyDetail, clearParty }