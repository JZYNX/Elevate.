const request = require('supertest');
const app = require('../server/Server');
const User = require('../server/models/userModel'); 
require('dotenv').config({ path: require('find-config')('.env') })

// Create a test user
const testUser = {
  username: 'testuser',
  password: 'testpassword123',
  email: 'test@testing.com'
};

beforeAll(async () => {
  await User.create(testUser);
});

afterAll(async () => {
  await app.close();
  await User.deleteOne({ username: testUser.username });
});

describe('User Authentication', () => {
  it('should allow a registered user to log in', async () => {
    // Create a test user in the database (if needed)

    // Send a POST request to the login endpoint with the test user's credentials
    const response = await request(app) 
      .post('/users/userExists') 
      .send({
        username: testUser.username,
        password: testUser.password,
      });

    // Expect a 200 OK response indicating successful login
    expect(response.status).toBe(200);
  });

  it('should reject login for an invalid user', async () => {
    // Send a POST request to the login endpoint with invalid credentials
    const response = await request(app) 
      .post('/users/userExists') 
      .send({
        username: 'nonexistentuser',
        password: 'invalidpassword',
      });

    // Expect a 401 Unauthorized or other relevant status code
    expect(response.status).toBe(401);
  });
});
