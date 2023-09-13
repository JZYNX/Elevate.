const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {
        type: String, 
        required: true,
        minLength: 10,
        maxLength: 30,
    },
    dateOfBirth: {type: Date, max: Date()},
    email: String,
    createdAt: {
        type: Date, 
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date, 
        default: () => Date.now(),
    },
    contacts: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    address: addressSchema,
})

userSchema.methods.sayHi = function(username) {
    console.log(`Hi, my username is ${this.username}`)
}

userSchema.statics.findByUsername = function(username) {
    return this.where({username})
}

module.exports = mongoose.model('User', userSchema)