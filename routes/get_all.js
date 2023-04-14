const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User')

router.get('/', async (req, res) => {
    console.log('evo me')
    const all_users = await User
    .find()
    .sort({name: 1})
    .select({name: 1, places: 1})
    console.log(all_users);
    res.send(all_users);
})

module.exports = router;