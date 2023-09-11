const mongoose = require('mongoose')
const User = require("./models/User")

mongoose.connect("mongodb://127.0.0.1:27017/testdb")

run()
async function run() {
    try{
        const user = await User.create({
            username: "John", 
            password: "23ig3i2gub3bgus",
            address: {
                street: "MckinnonRoad",
                city: "Melbourne"
            },
            dateOfBirth: "2023-03-28",
            contacts: "64fec27cc3111213abfea1fd",
        })
        await user.save()
        console.log(user)
        
        const user2 = await User.findByUsername("John")
        console.log(user2)
    } catch (e) {
        console.log(e.message)
    }
}