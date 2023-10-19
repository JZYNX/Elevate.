const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const messageRoute = require('./routes/messageRoute');
const OnlineUser = require('./models/onlineUsersModel');
const socket = require('socket.io');

dotenv.config({ path: require('find-config')('.env') });

// Express app
const app = express();
app.use(cors({ origin: true }));

// Middleware
app.use(express.json());
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/api/messages', messageRoute);

// Global folder for uploading images
app.use('/uploads/', express.static('uploads'));

// Server listen to port
const server = app.listen(process.env.PORT, () => {
  console.log('Listening for requests on port', process.env.PORT);
});

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://williamxiang007:testpass@cluster0.u2lrets.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to the database');

  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

//socket stuff
const io = socket(server, {
  cors: {
    origin: 'https://voltaic-layout-402210.ts.r.appspot.com',
    credentials: true,
  },
});

// const onlineUsers = new Map();

io.on("connection", (socket) => {
  // console.log('A user connected with ' + socket.id);

  socket.on("add-user", async (userId) => {
    try {
      // Try to find a user with the specified userId
      let user = await OnlineUser.findOne({ userId });
  
      if (!user) {
        // If the user doesn't exist, create a new online user record
        user = await OnlineUser.create({ userId, socketId: socket.id });
      } else {
        // If the user already exists, update their socketId
        user.socketId = socket.id;
        await user.save();
      }
      // console.log("the user is " + userId + " " + socket.id);
    } catch (err) {
      // Handle any errors here
      console.error('Error adding/updating user:', err);
    }
  });
  
  

  socket.on("send-msg", async (data) => {
    try {
      // Retrieve the recipient's socket ID from MongoDB
      const users = await OnlineUser.find({ userId: data.to });
      
      if (users && users.length > 0){
        // Send the message to the recipient's socket
        users.forEach((user) => {
          io.to(user.socketId).emit("msg-receive", data.message);
        });
      }
    } catch (err) {
      // Handle any errors here
      console.error(err);
    }
  });

  socket.on('disconnect', async () => {
    try {
      // Remove the user's online status from MongoDB upon disconnection
      await OnlineUser.deleteOne({ socketId: socket.id });
    } catch (err) {
      // Handle any errors here
      console.error('Error deleting user:', err);
    }
  });
  
});


// Properly close MongoDB connection when the application is shutting down
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    server.close(() => {
      console.log('Express server closed');
      process.exit(0);
    });
  });
});

module.exports = server;
