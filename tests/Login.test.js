const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/server'); 
const User = require('../server/models/userModel'); 
require('dotenv').config();

// Create a test user
const testUser = {
  username: 'testuser',
  password: 'testpassword123',
  email: 'test@testing.com'
};

// Mock MongoDB connection
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up the test user after the test
afterAll(async () => {
  await User.deleteOne({ username: testUser.username });
  await mongoose.connection.close();
});

describe('User Authentication', () => {
  it('should allow a registered user to log in', async () => {
    // Create a test user in the database
    await User.create(testUser);

    // Send a POST request to the login endpoint with the test user's credentials
    const response = await request(app)
      .post('/login') // Replace with your actual login endpoint
      .send({
        username: testUser.username,
        password: testUser.password,
        email: testUser.email
      });

    // Expect a 200 OK response indicating successful login
    expect(response.status).toBe(200);

    // You can add more assertions as needed based on your application's behavior
  });

  it('should reject login for an invalid user', async () => {
    // Send a POST request to the login endpoint with invalid credentials
    const response = await request(app)
      .post('/login') // Replace with your actual login endpoint
      .send({
        username: 'nonexistentuser',
        password: 'invalidpassword',
        email: 'invalidemail'
      });

    // Expect a 401 Unauthorized or other relevant status code
    expect(response.status).toBe(401);

    // You can add more assertions as needed based on your application's behavior
  });
});
