import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/auth';
import { PrismaClient } from '@prisma/client';

// Create an express app with auth routes for testing
const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Note: These tests are integration-style and expect a test database or mocked Prisma.
// For simplicity, these tests will check that routes exist and respond with 400 for invalid payloads.

describe('Auth routes', () => {
  test('register with invalid payload returns 400', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  test('login with missing fields returns 400', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'a@b.c' });
    expect(res.status).toBe(400);
  });
});
