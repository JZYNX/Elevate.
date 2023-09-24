const Messages = require("../models/messageModel");

/**
 * Get messages between two users.
 * @function
 * @param {Object} req - Express request object with 'from' and 'to' user IDs in the request body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function.
 * @returns {Object} - JSON array of messages between the specified users.
 */
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

/**
 * Add a new message to the database.
 * @function
 * @param {Object} req - Express request object with 'from', 'to', and 'message' fields in the request body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function.
 * @returns {Object} - JSON response indicating the success or failure of adding the message.
 */
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};