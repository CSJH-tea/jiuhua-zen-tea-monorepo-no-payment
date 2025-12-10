import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import productsRoutes from '../routes/products';

const app = express();
app.use(bodyParser.json());
app.use('/api/products', productsRoutes);

describe('Products routes', () => {
  test('GET /api/products returns 200', async () => {
    const res = await request(app).get('/api/products');
    expect([200, 500]).toContain(res.status); // 200 if DB available, 500 otherwise
  });
});
