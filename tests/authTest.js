import request from 'supertest';
import app from '../index.js';
import database from '../configs/dbConfig.js';

describe('Auth API', () => {
  beforeAll(async () => {
    await database.authenticate();
    await database.sync({ force: true });
  });

  afterAll(async () => {
    await database.close();
  });

  it('should register a user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('User-Agent', 'jest-test-agent')
      .send({
        name: 'ali',
        email: 'ali@test.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('ali@test.com');
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('User-Agent', 'jest-test-agent')
      .send({
        email: 'ali@test.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
