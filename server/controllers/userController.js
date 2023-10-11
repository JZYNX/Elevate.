const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const Post = require('../models/postModel')
const { default: axios } = require('axios')


/**
 * Get all users from the database.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON array of user documents.
 */
const getAllUsers = async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
}

/**
 * Get a user by their ID.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON representation of the user document.
 */
const getOneUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid id, needs to be mongo ID"})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "No such user"})
    }

    return res.status(200).json(user)
}

/**
 * Get a user by their username.
 * @function
 * @param {Object} req - Express request object with a username field in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON representation of the user document.
 */
const getOneUserByUsername = async (req, res) => {
  const {username} = req.body

  const user = await User.findOne({username})
  if (!user) {
      return res.status(404).json({error: "No such user", user})
  }
  console.log("THE USER RETURN" + user.username);
  return res.status(200).json(user)
}


/**
 * Create a new user and save it to the database.
 * @function
 * @param {Object} req - Express request object with user data in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON representation of the created user document.
 */
const createUser = async (req, res) => {
    const {username, password, email} = req.body

    // check if password contains a specific substring  
    const substring = "sok";
    const lowercasePassword = password.toLowerCase();
    const lowercaseSubstring = substring.toLowerCase();

    if (lowercasePassword.includes(lowercaseSubstring)) {
        return res.status(400).json({ message: "Password contains " + substring})
    }

    try {
        const user = await User.create({username, password, email})
        
        // Create a user on an external service 
        const r = await axios.put(
          'https://api.chatengine.io/users/',
          {username:username, secret:username, first_name:username},
          {headers: {"private-key" : "03afede7-020b-4a77-8c46-6558ae0b88c6"}}
        )
        res.status(200).json(r.data)    
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

/**
 * Check if a user with the provided username and password exists in the database.
 * @function
 * @param {Object} req - Express request object with username and password fields in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the result of the user existence check.
 */
const userExists = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Authentication is successful
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Upload an image and save its path to the database.
 * @function
 * @param {Object} req - Express request object with an uploaded image file.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function.
 * @returns {Object} - JSON response containing information about the uploaded image.
 */
const postImage = async (req, res,next) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: "No image uploaded" });
        }

        // Save the file path to the database
        const { path } = req.file;
        const newImage = await Post.create({ imagePath: path });
        newImage.save();

        console.log("THE returning IAMGE omg " + path);
        return res.status(200).json({ msg: "New image uploaded...!", filePath: path });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Update user information.
 * @function
 * @param {Object} req - Express request object with updated user data in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON representation of the updated user document.
 */
const updateUser = async (req, res) => {
    const { username, password } = req.body;
    const updatedUserData = req.body;

    try {
        // Check if the username exists in the database
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Username must exist" });
        }

        // check is password is valid
        if (password && (password.length < global.PASSWORD_MIN_LENGTH || password.length > global.PASSWORD_MAX_LENGTH)) {
            return res.status(400).json({ message: "Password must be between 10 and 30 characters!"});
        }
        // check if profile pic was uploaded.
        if (req.file) {
            updatedUserData.userImage = req.file.path;
        }
        // Find the user based on the username
        const updatedUser = await User.findOneAndUpdate(
        { username }, // Query to find the user by username
        { $set: updatedUserData }, // Update the user's data with the provided data
        { new: true } // Return the updated user
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(updatedUser);
      
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

/**
 * Update user image.
 * @function
 * @param {Object} req - Express request object with an uploaded image file.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing information about the updated user image.
 */
const updateImage = async (req , res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }
    const imageUrl = req.file.path;
    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    return;
}

/**
 * Upload an event for a user and update their events array.
 * @function
 * @param {Object} req - Express request object with username and event data in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON representation of the updated user document with the new event.
 */
const uploadEvent = async (req, res) => {
    try {
      // Assuming the frontend sends both the username and event data in the request body
      const { username, event } = req.body;
  
      // Find the user by username and update their events array
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        { $push: { events: event } }, // Add the event to the events array
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Respond with a success message or updated user data
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error uploading event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
 * Update user events.
 * @function
 * @param {Object} req - Express request object with username and updated events data in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON representation of the updated user document with the updated events.
 */
const updateEvents = async (req, res) => {
    try {
      // Assuming the frontend sends both the username and the complete events array
      const { username, event } = req.body;
      // Find the user by username and set their events array to the updatedEvents
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        { events: event }, // Set the events array to the new updatedEvents
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Respond with a success message or updated user data
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error uploading event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

// function for testing purposes only
const deleteUsersExceptSkyrider = async (req, res) => {
    try {
      await User.deleteMany({ username: { $ne: 'Skyrider' } });
      res.status(200).json({message: `Deleted all users except Skyrider.`});
    } catch (error) {
      console.error('Error deleting users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  //function for getting upcoming events count
  const getEventCount = async (req, res) => {
    try {
      const { username } = req.params;
      
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Filter events based on the current date and onwards
      const currentDate = new Date();
      const filteredEvents = user.events.filter((event) => new Date(event.start) >= currentDate);
      const eventCount = filteredEvents.length;
  
      res.status(200).json({ eventCount });
    } catch (error) {
      console.error('Error getting user event count:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

//function for getting list of events
const getUserEvents = async (req, res) => {
  try{
      const { username } = req.params;
      // console.log("The user is " + username);
      //find user
      const user = await User.findOne({username});

      if(!user){
        return res.status(404).json({ error: 'User not found '  });
      }

      const userEvents = user.events;
      // console.log("user found " + eventCount);
      res.status(200).json({ userEvents });
  } catch (error) {
    console.error('Error getting user event count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const makeNote = async (req,res)=>{
  try{
    const {username} = req.params;
    const { title, content } = req.body;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newNote = { title, content };
    user.notes.push(newNote);
    await user.save();

    return res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error){
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
};

const getAllNotes = async (req,res)=>{
  try{
    const {username} = req.params;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user.notes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const updateNote = async (req,res) => {
  try{
    const {username} = req.params;
    const { id, title, content } = req.body;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const noteToUpdate = user.notes.find((note) => note.id === id);
    if (!noteToUpdate) {
      return res.status(404).json({ message: 'Note not found' });
    }

    noteToUpdate.title = title;
    noteToUpdate.content = content;

    await user.save();

    return res.status(200).json({ message: 'Note updated successfully', note: noteToUpdate });
  } catch (error){
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}


const deleteNote = async (req, res) => {
  try {
    const { username } = req.params;
    const { id } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the note with the specified ID
    const noteIndex = user.notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Remove the note from the user's notes array
    user.notes.splice(noteIndex, 1);

    await user.save();

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const addConnection = async (req, res) => {
  try {
    const {username} = req.param;
    const { userAdded } = req.body;

    const user = await User.findOne({username});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.connections.push(userAdded);
    await user.save();
    return res.status(201).json({ message: 'user added successfully'});
  } catch (error){
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' })
  }

};

//function for getting connections count
const getConnectionCount = async (req, res) => {
  try{
      const { username } = req.params;
      // console.log("The user is " + username);
      //find user
      const user = await User.findOne({username});

      if(!user){
        return res.status(404).json({ error: 'User not found '  });
      }

      const connectionCount = user.connections.length;
      // console.log("user found " + eventCount);
      res.status(200).json({ connectionCount });
  } catch (error) {
    console.error('Error getting user connection count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    userExists,
    postImage,
    updateImage,
    uploadEvent,
    updateEvents,
    deleteUsersExceptSkyrider,
    getOneUserByUsername,
    getEventCount,
    getUserEvents,
    makeNote,
    getAllNotes,
    updateNote,
    deleteNote,
    addConnection,
    getConnectionCount
}