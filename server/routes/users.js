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
    postImage,
    uploadEvent,
    updateEvents,
} = require('../controllers/userController')



//GET all users
router.get('/', getAllUsers)

//GET one user
router.get('/:id', getOneUser)

//POST a new user
router.post('/', createUser)

//UPDATE a user
// router.patch('/:id', updateUser)



router.patch('/',updateUser)

router.put('/uploadImage', upload.single('userImage'), postImage)

router.put('/createEvent', uploadEvent); 

router.put('/editEvents', updateEvents); 


module.exports = router