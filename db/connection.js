require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`)
  .then((res) => console.log('connected to mongoose!'))
  .catch((err) => console.log('error connecting to db. error: ', err))

module.exports = mongoose;