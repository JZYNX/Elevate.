const request = require('supertest');
const app = require('../server/Server');
const User = require('../server/models/userModel'); 
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
  await app.close();
});

describe('User Authentication', () => {
  it('should return 200 response for existing user', async () => {
    // Send a POST request to the user endpoint with the test user's credentials
    const response = await request(app) 
      .post('/users/userExists') 
      .send({
        username: validTestUser.username,
        password: validTestUser.password,
      });

    expect(response.status).toBe(200);
  });

  it('should return 401 response for nonexisting user', async () => {
    // Send a POST request to the user endpoint with invalid credentials
    const response = await request(app) 
      .post('/users/userExists') 
      .send({
        username: nonexistentUser.username,
        password: nonexistentUser.password,
      });

    expect(response.status).toBe(401);
  });

  it ('should return 401 response for existing user with incorrect password', async () => {
    // Send a POST request to the user endpoint with incorrect password
    const response = await request(app)
      .post('/users/userExists')
      .send({
        username: validTestUser.username,
        password: nonexistentUser.password,
      });
    
    expect(response.status).toBe(401);
  });

  it ('should get all users in the database', async () => {
    // Send a GET request to the user endpoint
    const response = await request(app).get('/users');
    
    expect(response.status).toBe(200);
  });

});
