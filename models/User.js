const mongoose = require('mongoose');

const new_user_schema = mongoose.Schema({
    name: String,
    age: Number,
    date: {type: Date, default: Date.now},
    places: [String]
})
const New_user = mongoose.model('users', new_user_schema);

module.exports = New_user;