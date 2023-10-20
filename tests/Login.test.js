const request = require('supertest');
const app = require('../server/server');
const User = require('../server/models/userModel'); 
const { INVALID_USERNAME, INVALID_PASSWORD } = require('../server/controllers/userController');
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
  it('should return 200 response for existing user with response time < 1s', async () => {
    const startTime = new Date().getTime();
    const response = await request(app) 
      .post('/users/userExists') 
      .send({
        username: validTestUser.username,
        password: validTestUser.password,
      });
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(1000); // Assert that the response time is less than 1 second
  });

  it('should return 401 response for nonexisting user with response time < 1s', async () => {
    const startTime = new Date().getTime();
    const response = await request(app) 
      .post('/users/userExists') 
      .send({
        username: nonexistentUser.username,
        password: nonexistentUser.password,
      });
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(INVALID_USERNAME);
    expect(responseTime).toBeLessThan(1000); // Assert that the response time is less than 1 second
  });

  it('should return 401 response for existing user with incorrect password with response time < 1s', async () => {
    const startTime = new Date().getTime();
    const response = await request(app)
      .post('/users/userExists')
      .send({
        username: validTestUser.username,
        password: nonexistentUser.password,
      });
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(INVALID_PASSWORD);
    expect(responseTime).toBeLessThan(1000); // Assert that the response time is less than 1 second
  });

  it('should get all users in the database with response time < 1s', async () => {
    const startTime = new Date().getTime();
    const response = await request(app).get('/users');
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(1000); // Assert that the response time is less than 1 second
  });
});
