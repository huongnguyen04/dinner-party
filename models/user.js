const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: String,
  email: String,
  partiesHosting: [
    {
      created: { type: Boolean, default: false },
      theme: String,
      date: String,
      host: String,
      entrees: [String],
      appetizers: [String],
      sides: [String],
      drinks: [String],
      desserts: [String],
      guests: [
        {
          name: String,
          email: String,
          confirmed: { type: Boolean, default: false }
        }
      ]
    }
  ]
});

module.exports = UserSchema;