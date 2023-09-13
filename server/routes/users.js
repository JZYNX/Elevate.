const express = require('express')
const User = require('../models/userModel')

const router = express.Router()

//GET all users
router.get('/', (req, res) => {
    res.json({mssg: "GET all users"})
})

module.exports = router