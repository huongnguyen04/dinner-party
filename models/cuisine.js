const mongoose = require('mongoose');

const CuisineSchema = new mongoose.Schema({
  name: String,
  type: String,
  category: String
});

module.exports = CuisineSchema;