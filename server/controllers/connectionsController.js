const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const Post = require('../models/postModel')


// get all connections of user
const getAllConnections= async (req, res) => {
    const { username } = req.body;

    try {
        // Check if the username exists in the database
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Retrieve the connections of the user
        const connections = await User.find({ _id: { $in: existingUser.connections } });
        return res.status(200).json(connections);

    } catch(err) {
        console.error('Error getting connections:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const addConnectionForUser = async (req, res) => {
    try {
        const { username, newConnection } = req.body;

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
        currUser.connections.push(newConnUser);

        // Save the user document with the updated connections
        await currUser.save();

        // Return a success response with the updated user data
        return res.status(200).json(currUser);
    } catch (error) {
        console.error('Error adding connection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteConnectionForUser = async (req, res) => {
    try {
        const { username, connectionToDelete } = req.body;

        // Find the user based on their username
        const currUser = await User.findOne({ username });
        const connectionUser = await User.findOne({ username: connectionToDelete });

        if (!currUser || !connectionUser) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Check if the connectionUser exists in currUser's connections
        const connectionIndex = currUser.connections.indexOf(connectionUser._id);
        if (connectionIndex === -1) {
            return res.status(200).json({ msg: "ConnectionUser was not part of the connection list" });
        }

        // Remove the connectionUser from the user's connections array
        currUser.connections.splice(connectionIndex, 1);

        // Save the user document with the updated connections
        await currUser.save();

        // Return a success response with the updated user data
        return res.status(200).json(currUser);
    } catch (error) {
        console.error('Error deleting connection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllConnections,
    addConnectionForUser,
    deleteConnectionForUser
}