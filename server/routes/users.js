const express = require('express')
const multer = require('multer')
const router = express.Router()

//creating multer storage
const storage = multer.diskStorage({
    //setting destination and filename
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});

//filter to accept only jpeg and png
const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

//constraint based on our filter and also only allow images to be 5MB max
const upload = multer({
    storage:storage, 
    limits:  {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
    }
)


const {
    createUser,
    getOneUser,
    getAllUsers,
    updateUser,
    userExists,
    postImage,
    uploadEvent,
    updateEvents,
    deleteUsersExceptSkyrider,
    getOneUserByUsername,
    getEventCount,
    getUserEvents,
} = require('../controllers/userController')

// GET all users
router.get('/', getAllUsers)

// GET one user
router.get('/:id', getOneUser)

// POST a new user
router.post('/', createUser)

//Check if a user exists
router.post('/userExists', userExists)

// Get a user by username
router.post('/getUser', getOneUserByUsername);

// Update a user
router.patch('/',updateUser)

// Upload an image
router.put('/uploadImage', upload.single('userImage'), postImage)

// Create an event
router.put('/createEvent', uploadEvent); 

// Edit events
router.put('/editEvents', updateEvents); 

// Delete users except Skyrider
router.delete('/deleteUsersExceptSkyrider', deleteUsersExceptSkyrider);

//find user and get event count
router.get('/:username/event-count',getEventCount);

//find user and get user events
router.get('/:username/userEvents',getUserEvents);

const {
    getAllConnections,
    addConnectionForUser,
    deleteConnectionForUser
} = require('../controllers/connectionsController');

// GET all connections for a user
router.get('/connections/getAll', getAllConnections)

// PATCH - add a connection for a user
router.patch('/connections', addConnectionForUser)

// DELETE a connection from a user
router.delete('/connections', deleteConnectionForUser)

module.exports = router