const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: String,
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
      confirmed: { type: Boolean, default: false }
    }
  ]
});

// const User = mongoose.model('User', UserSchema);

module.exports = UserSchema;