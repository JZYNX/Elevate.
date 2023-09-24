const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const messageRoute = require('./routes/messageRoute');
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
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');

    const io = socket(server, {
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    });

    const onlineUsers = new Map();

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
      });

      socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit('msg-receive', data.message);
        }
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
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
