const mongoose = require('mongoose');

const CuisineSchema = new mongoose.Schema ({
  name: String,
  type: String,
  category: String
});
const Cuisine = new mongoose.model('Cuisine', CuisineSchema);

module.exports = Cuisine;