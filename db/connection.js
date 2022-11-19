require("dotenv").config();
const mongoose = require('mongoose');
const CuisineSchema = require('../models/cuisine.js');
const UserSchema = require('../models/user.js');

var conn1 = mongoose.createConnection(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB1_NAME}`)
var conn2 = mongoose.createConnection(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB2_NAME}`)

var Cuisine = conn1.model('Cuisine', CuisineSchema)
var User = conn2.model('User', UserSchema);

Cuisine.find({}, function() {
  console.log("this will print out last");
});
User.find({}, function() {
  console.log("this will print out first");
});

module.exports = { conn1, conn2, Cuisine, User };