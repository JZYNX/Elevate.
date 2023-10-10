const mongoose = require('mongoose');

const onlineUserSchema = new mongoose.Schema({
  userId: String,
  socketId: String,
});

const OnlineUser = mongoose.model('OnlineUser', onlineUserSchema);

module.exports = OnlineUser;
