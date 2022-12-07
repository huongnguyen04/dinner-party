const { User } = require('../../db/connection.js');

const getInvitations = (req, res) => {
  let parties = [];
  User.find({'partiesHosting.guests.email': req.params.userEmail})
    .then((data) => {
      data[0].partiesHosting.forEach((party) => {
        party.guests.forEach((guest) => {
          if (guest.email === req.params.userEmail) {
            parties.push([party, data[0].email]);
          }
        })
      })
      parties.sort(function(a,b) {
        return new Date(a[0].date) - new Date(b[0].date);
      })
      res.send(parties);
    })
    .catch((err) => console.log('Error, could not get invitations from database. Error: ', err))
}

module.exports = { getInvitations }