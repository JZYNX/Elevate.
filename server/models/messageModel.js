const mongoose = require("mongoose");

// Schema for messages
const MessageSchema = mongoose.Schema({
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Reference to user who sent this message
      required: true,
    },
  }, {timestamps: true,}); // Enable timestamps for created and updated dates

module.exports = mongoose.model("Messages", MessageSchema);