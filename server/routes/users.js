const express = require('express')
const {
    createUser,
    getOneUser,
    getAllUsers,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

//GET all users
router.get('/', getAllUsers)

//GET one user
router.get('/:id', getOneUser)

//POST a new user
router.post('/', createUser)

//UPDATE a user
router.patch('/:id', updateUser)

module.exports = router