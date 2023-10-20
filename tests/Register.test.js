const request = require('supertest');
const app = require('../server/server');
const User = require('../server/models/userModel'); 
const { USERNAME_EXISTS_MESSAGE, EMAIL_EXISTS_MESSAGE, PASSWORD_LENGTH_MESSAGE, INVALID_EMAIL_MESSAGE } = require('../server/controllers/userController');
require('dotenv').config({ path: require('find-config')('.env') })

const validTestUser = {
  username: 'testuser',
  password: 'testpassword123',
  email: 'test@testing.com'
};

const nonexistentUser = {
  username: 'nonexistentuser',
  password: 'randompassword123',
  email: 'nontest@testing.com'
}

// Create a validTestUser in the database
beforeAll(async () => {
  await User.create(validTestUser);
});

// Delete the test users from the database
afterAll(async () => {
  await User.deleteOne({ username: validTestUser.username });
  await User.deleteOne({ username: nonexistentUser.username });
  await app.close();
});

describe('User Registration', () => {
  
  it('should return 400 for trying to register with an existing username', async () => {
    // Send a POST request to the user endpoint with invalid credentials
    const startTime = Date.now(); // Record the start time
    const response = await request(app) 
      .post('/users') 
      .send({
        username: validTestUser.username,
        password: validTestUser.password,
        email: nonexistentUser.email
      });
    const endTime = Date.now(); // Record the end time
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(USERNAME_EXISTS_MESSAGE);
    expect(endTime - startTime).toBeLessThan(1000);
  });

  it('should return 400 for trying to register with an existing email', async () => {
    // Send a POST request to the user endpoint with invalid credentials
    const startTime = Date.now(); // Record the start time
    const response = await request(app) 
      .post('/users') 
      .send({
        username: nonexistentUser.username,
        password: nonexistentUser.password,
        email: validTestUser.email
      });
    const endTime = Date.now(); // Record the end time
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(EMAIL_EXISTS_MESSAGE);
    expect(endTime - startTime).toBeLessThan(1000);
  });

  it('should return 400 for trying to register with a short password', async () => {
    // Send a POST request to the user endpoint with invalid credentials
    const startTime = Date.now(); // Record the end time
    const response = await request(app) 
      .post('/users') 
      .send({
        username: nonexistentUser.username,
        password: "shortpass",
        email: nonexistentUser.email
      });
    const endTime = Date.now(); // Record the end time
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(PASSWORD_LENGTH_MESSAGE);
    expect(endTime - startTime).toBeLessThan(1000);
  });

  it('should return 400 for trying to register with an invalid email', async () => {
    // Send a POST request to the user endpoint with invalid credentials
    const startTime = Date.now(); // Record the end time
    const response = await request(app) 
      .post('/users') 
      .send({
        username: nonexistentUser.username,
        password: nonexistentUser.password,
        email: "notAnEmail"
      });
    const endTime = Date.now(); // Record the end time
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(INVALID_EMAIL_MESSAGE);
    expect(endTime - startTime).toBeLessThan(1000);
  });

  it('should return 200 for trying to register with a nonexisting user with valid credentials', async () => {
    // Send a POST request to the user endpoint with invalid credentials
    const startTime = Date.now(); // Record the end time
    const response = await request(app) 
      .post('/users') 
      .send({
        username: nonexistentUser.username,
        password: nonexistentUser.password,
        email: nonexistentUser.email
      });
    const endTime = Date.now(); // Record the end time
    expect(response.status).toBe(200);
    
    const user = response.body; 
    // Perform assertions on the user data
    expect(user).toHaveProperty('username', nonexistentUser.username);
    expect(user).toHaveProperty('email', nonexistentUser.email);
    expect(endTime - startTime).toBeLessThan(1000);
  });
  
  it ('should get all users in the database', async () => {
    // Send a GET request to the user endpoint
    const response = await request(app).get('/users');
    
    expect(response.status).toBe(200);
  });

});
