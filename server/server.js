require('dotenv').config({ path: require('find-config')('.env') })
const cors = require("cors")
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users') 
const messageRoute = require('./routes/messageRoute') 
const socket = require("socket.io")

// express app
const app = express()
app.use(cors({ origin: true }));
// middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/users', userRoutes)
app.use('/api/messages',messageRoute)
//global folder for uploading images
app.use('/uploads/',express.static('uploads'));
// server listen to port
const server = app.listen(process.env.PORT, () => {
  console.log('listening for requests on port', process.env.PORT)
})
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    global.onlineUsers = new Map();

    io.on("connection", (socket)=> {
      global.chatSocket=socket;
      socket.on("add-user", (userId) =>{
        onlineUsers.set(userId,socket.id);
      })
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