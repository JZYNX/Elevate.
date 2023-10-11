const mongoose = require('mongoose')
const Note = require('./noteModel'); // Import the Note schema

// global variables for password length
global.PASSWORD_MIN_LENGTH = 10;
global.PASSWORD_MAX_LENGTH = 30;

// Sub-document schema for the address
const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
})

// Sub-document schema for events
const eventSchema = new mongoose.Schema({
    id: String,
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
    description: String,
});

// Main user schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true,
        minLength: global.PASSWORD_MIN_LENGTH,
        maxLength: global.PASSWORD_MAX_LENGTH,
    },
    dateOfBirth: {
        type: Date, 
        max: Date()
    },
    email: {
        type: String, 
        required: true,
        // validate: {
        //     validator: validateEmail, // Use the validateEmail function for validation
        //     message: 'Invalid email address',
        // },
    },
    contactNumber:{
        type: String, 
    },
    connections: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User", // Reference to other users
        },
    ],
    connectionDates:[
        {
            storingConnectionId:String,
            date:Date,
        }
    ],
    pendingConnections: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User", // Reference to other users
        },
    ],
    address: addressSchema,
    profilePic: {       // Not using this field for now
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post",    // Reference to posts (not used)
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userImage: {
        type:String,
    },
    events: [eventSchema],
    notes: [Note.schema],
}, {timestamps: true}) // Enable timestamps for created and updated dates

module.exports = mongoose.model('User', userSchema)