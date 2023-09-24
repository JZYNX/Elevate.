const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();

// Endpoint for adding a message
router.post("/addmsg/", addMessage);

// Endpoint for getting messages
router.post("/getmsg/", getMessages);

module.exports = router;