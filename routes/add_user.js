const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');


router.post('/', async (req, res) => {
   console.log('na poctku funkcije async');
     const new_user = new User({
        name: req.body.name,
        age: req.body.age,
        places: req.body.places
     })
     const added_user = await new_user.save();
     console.log('posle await');
     res.send(added_user);
     console.log('posle korisecenja rezultata await');
})

module.exports = router;