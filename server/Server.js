require('dotenv').config({ path: require('find-config')('.env') })
const cors = require("cors")
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users') 
const messageRoute = require('./routes/messageRoute') 
const socket = require("socket.io")

// Create express application
const app = express()

// middleware
app.use(cors({ origin: true }));
app.use(express.json())
app.use(cors())

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Define routes
app.use('/users', userRoutes)
app.use('/api/messages',messageRoute)

//global folder for uploads
app.use('/uploads/',express.static('uploads'));

// server listen to port
const server = app.listen(process.env.PORT, () => {
  console.log('listening for requests on port', process.env.PORT)
})

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')

    // initialise socket
    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    // global map to store users
    global.onlineUsers = new Map();

    io.on("connection", (socket)=> {
      global.chatSocket=socket;

      // Event handler for adding a user to the online users map
      socket.on("add-user", (userId) =>{
        onlineUsers.set(userId,socket.id);
      })
      
      // Event handler for sending a message
      socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
          socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
      })
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

module.exports = server;
