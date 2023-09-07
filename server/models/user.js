const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: True},
    password: {type: String, required: True}
})

module.exports = mongoose.model('User', userSchema);