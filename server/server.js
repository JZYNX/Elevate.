require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users') 

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/users', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

// run()
// async function run() {
//     try{
//         const user = await User.create({
//             username: "John", 
//             password: "23ig3i2gub3bgus",
//             address: {
//                 street: "MckinnonRoad",
//                 city: "Melbourne"
//             },
//             dateOfBirth: "2023-03-28",
//             contacts: "64fec27cc3111213abfea1fd",
//         })
//         await user.save()
//         console.log(user)
        
//         const user2 = await User.findByUsername("John")
//         console.log(user2)
//     } catch (e) {
//         console.log(e.message)
//     }
// }