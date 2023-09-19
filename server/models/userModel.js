const mongoose = require('mongoose')

// global variables
global.PASSWORD_MIN_LENGTH = 10;
global.PASSWORD_MAX_LENGTH = 30;

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
})

const eventSchema = new mongoose.Schema({
    id: String,
    title: String,
    start: Date,
    end: Date,
    description: String,
    // Add any other event-related fields as needed
});

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
        validate: {
            validator: validateEmail, // Use the validateEmail function for validation
            message: 'Invalid email address',
        },
    },
    contactNumber:{
        type: String, 
    },
    contacts: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    address: addressSchema,
    profilePic: {       // Not using this field for now
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post",
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
}, {timestamps: true})

userSchema.statics.findByUsername = function(username) {
    return this.where({username})
}



module.exports = mongoose.model('User', userSchema)