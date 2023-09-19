const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    myFile : String
});
module.exports = mongoose.model('Post', postSchema)