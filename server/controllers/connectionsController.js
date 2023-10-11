const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const Post = require('../models/postModel')


/**
 * Get all connections of a user.
 * @function
 * @param {Object} req - Express request object with 'username' in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON array of user connections.
 */
const getAllConnections= async (req, res) => {
    const { username } = req.params;
    // console.log("THE USER NAME IS " + username);
    try {
        // Check if the username exists in the database
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Retrieve the connections of the user
        const connections = await User.find({ _id: { $in: existingUser.connections } })
            .select("username email contactNumber firstName lastName userImage");
        return res.status(200).json(connections);

    } catch(err) {
        console.error('Error getting connections:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllPendingConnections= async (req, res) => {
    const { username } = req.params;
    // console.log("THE USER NAME IS " + username);
    try {
        // Check if the username exists in the database
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Retrieve the connections of the user
        const pendingConnections = await User.find({ _id: { $in: existingUser.pendingConnections } })
            .select("username email contactNumber firstName lastName userImage");
        return res.status(200).json(pendingConnections);

    } catch(err) {
        console.error('Error getting connections:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


/**
 * Add a new connection for a user.
 * @function
 * @param {Object} req - Express request object with 'username' and 'newConnection' in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure with updated user data.
 */
const addConnectionForUser = async (req, res) => {
    try {
        const { username, newConnection } = req.body;
        console.log("our username "  + username + "the wanted connection is " + newConnection);
        if (username === newConnection) {
            return res.status(400).json({ error: 'cannot add user to their own connection' });
        }

        // Find the user based on their username
        const currUser = await User.findOne({ username });
        const newConnUser = await User.findOne({ username: newConnection });
        const currentDate = new Date();
        currUser.connectionDates.push({ storingConnectionId: newConnUser._id, date: currentDate });
        newConnUser.connectionDates.push({ storingConnectionId: currUser._id, date: currentDate });
        if (!currUser || !newConnUser) {
            return res.status(400).json({ error: 'a user is not found' });
        }

        // Check if the newConnUser already exists in currUser's connections
        if (currUser.connections.includes(newConnUser._id)) {
            return res.status(400).json({ error: 'Connection already exists' });
        }
    
        // Add the new connection to the user's connections array
        currUser.connections.push(newConnUser);
        newConnUser.connections.push(currUser);

        // Save the user document with the updated connections
        await currUser.save();
        await newConnUser.save();

        // Return a success response with the updated user data
        return res.status(200).json(currUser);
    } catch (error) {
        console.error('Error adding connection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// send friend request by adding it to user pending
const addPendingConnection = async (req, res) => {
    try {
        const { username, newConnection } = req.body;
        // console.log("our username "  + username + "the wanted connection is " + newConnection);
        if (username === newConnection) {
            return res.status(400).json({ error: 'cannot add user to their own connection' });
        }

        // Find the user based on their username
        const currUser = await User.findOne({ username });
        const newConnUser = await User.findOne({ username: newConnection });

        if (!currUser || !newConnUser) {
            return res.status(400).json({ error: 'a user is not found' });
        }

        // Check if the newConnUser already exists in currUser's connections
        if (currUser.connections.includes(newConnUser._id)) {
            return res.status(400).json({ error: 'Connection already exists' });
        }
    
        // Add the new connection to the user's connections array
        newConnUser.pendingConnections.push(currUser);

        // Save the user document with the updated connections
        await newConnUser.save();

        // Return a success response with the updated user data
        return res.status(200).json(newConnUser);
    } catch (error) {
        console.error('Error adding connection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


/**
 * Delete a connection for a user.
 * @function
 * @param {Object} req - Express request object with 'username' and 'connectionToDelete' in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure with updated user data.
 */
const deleteConnectionForUser = async (req, res) => {
    try {
        const { username, connectionToDelete } = req.body;

        // Find the user based on their username
        const currUser = await User.findOne({ username });
        const connectionUser = await User.findOne({ username: connectionToDelete });

        if (!currUser || !connectionUser) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Check if the connectionUser exists in currUser's connections and vise versa
        const connectionIndex = currUser.connections.indexOf(connectionUser._id);
        const currentUserIndex = connectionUser.connections.indexOf(currUser._id);
        if (connectionIndex === -1) {
            return res.status(200).json({ msg: "ConnectionUser was not part of the connection list" });
        }

        // Remove the connectionUser from both user's connections array
        currUser.connections.splice(connectionIndex, 1);
        connectionUser.connections.splice(currentUserIndex,1);
        
        const currUserConnectionDateIndex = currUser.connectionDates.findIndex(
            (entry) => entry.storingConnectionId === connectionUser._id.toString()
        );
        const connectionUserConnectionDateIndex = connectionUser.connectionDates.findIndex(
            (entry) => entry.storingConnectionId === currUser._id.toString()
        );

        if (currUserConnectionDateIndex !== -1) {
            currUser.connectionDates.splice(currUserConnectionDateIndex, 1);
        }

        if (connectionUserConnectionDateIndex !== -1) {
            connectionUser.connectionDates.splice(connectionUserConnectionDateIndex, 1);
        }

        // Save the user document with the updated connections
        await currUser.save();
        await connectionUser.save();

        // Return a success response with the updated user data
        return res.status(200).json(currUser);
    } catch (error) {
        console.error('Error deleting connection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const deletePendingConnectionForUser = async (req, res) => {
    try {
        const { username, connectionToDelete } = req.body;
        console.log("THE USER " + username);
        console.log("TH ED ELETE " +connectionToDelete);
        // Find the user based on their username
        const currUser = await User.findOne({ username });
        const connectionUser = await User.findOne({ username: connectionToDelete });
        // console.log(connectionUser.username);
        if (!currUser || !connectionUser) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Check if the connectionUser exists in currUser's connections
        const connectionIndex = currUser.pendingConnections.indexOf(connectionUser._id);
        if (connectionIndex === -1) {
            return res.status(200).json({ msg: "ConnectionUser was not part of the connection list" });
        }

        // Remove the connectionUser from the user's connections array
        currUser.pendingConnections.splice(connectionIndex, 1);

        // Save the user document with the updated connections
        await currUser.save();

        // Return a success response with the updated user data
        return res.status(200).json(currUser);
    } catch (error) {
        console.error('Error deleting connection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getDatesForUser = async (req, res) => {
    try {
        // Extract the username from the request parameters
        const { username } = req.params;
        
        // Find the user based on their username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract dates from the user's connectionDates array
        const dates = user.connectionDates;
       
        // console.log("THE DATES ARE: " + dates);
        
        // Send the dates as a JSON response
        return res.status(200).json( dates );
    } catch (error) {
        console.error('Error fetching dates for user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const dropAllConnections = async (username) => {
    try {
      // Find the user based on their username
      const currUser = await User.findOne({ username });
  
      if (!currUser) {
        return { success: false, error: 'User not found' };
      }
  
      // Clear the connections array
      currUser.connections = [];
      
      // Clear the connectionDates array
      currUser.connectionDates = [];
  
      // Save the updated user document
      await currUser.save();
  
      return { success: true, message: 'All connections dropped successfully' };
    } catch (error) {
      console.error('Error dropping all connections:', error);
      return { success: false, error: 'Internal server error' };
    }
  };
  

module.exports = {
    getAllConnections,
    addConnectionForUser,
    deleteConnectionForUser,
    addPendingConnection,
    getAllPendingConnections,
    deletePendingConnectionForUser,
    getDatesForUser,
    dropAllConnections,
}