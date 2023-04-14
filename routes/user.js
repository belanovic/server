const express = require('express');
const router = express.Router();
const Joi = require('joi');

const users = [
    {id: 1, username: 'Belanovic'},
    {id: 2, username: 'Petrovic'},
    {id: 3, username: 'Markovic'}
]

const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    id: Joi.number()
})

router.get('/:username', (req, res) => {
    const user_found = users.find((c) => c.username === req.params.username);
    if(!user_found) res.status(404).send("User not found");
    if(user_found) res.json(user_found.id);
})

module.exports = router;