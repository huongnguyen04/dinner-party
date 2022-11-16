const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.render('users/index', {users});
    })
    .catch(console.error)
})