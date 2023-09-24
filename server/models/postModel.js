const mongoose = require('mongoose')

// This Schema is currently not in use
const postSchema = new mongoose.Schema({
    myFile : String
});
module.exports = mongoose.model('Post', postSchema)