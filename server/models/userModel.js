const mongoose = require('mongoose')

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

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true,
        minLength: 10,
        maxLength: 30,
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
    profilePic: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post",
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
}, {timestamps: true})

userSchema.methods.sayHi = function(username) {
    console.log(`Hi, my username is ${this.username}`)
}

userSchema.statics.findByUsername = function(username) {
    return this.where({username})
}



module.exports = mongoose.model('User', userSchema)