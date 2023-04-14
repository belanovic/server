const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.put('/', async (req, res) => {
    const user = await User.findById(req.body.id);
    if(!user) return;
    user.name = req.body.name;
    const user_updated = await user.save();
    res.send(user_updated);
})

module.exports = router;