const { User } = require('../db/connection.js');

const addUserDetail = (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {email: req.body.email}, {returnDocument: 'after', upsert: true})
    .then((data) => {
      res.send('Successfully added user details to database');
    })
    .catch((err) => console.log('Error, could not add user details to database. Error: ', err));
}

const getParties = (req, res) => {
  User.find({userId: req.params.userId})
    .then((data) => {
      res.send(data[0]);
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

const getInvitations = (req, res) => {
  let dataObj = {};
  dataObj.parties = [];
  User.find({'partiesHosting.guests.email': req.params.userEmail})
    .then((data) => {
      console.log('data: ', data)
      data[0].partiesHosting.forEach((party) => {
        party.guests.forEach((guest) => {
          if (guest.email === req.params.userEmail) {
            dataObj.parties.push([party, data[0].email]);
          }
        })
      })
      res.send(dataObj);
    })
    .catch((err) => console.log('Error, could not get invitations from database. Error: ', err))
}

module.exports = { getPartyData, getParties, addUserDetail, deleteParties, addParty, addGuest, deleteGuest, modifyGuest, addPartyDetail, clearParty, addEntree, addAppetizer, addSide, addDrink, addDessert, deleteEntree, deleteAppetizer, deleteSide, deleteDrink, deleteDessert, getInvitations }