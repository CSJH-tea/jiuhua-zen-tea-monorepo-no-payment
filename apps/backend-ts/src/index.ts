import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import webhookRoutes from './routes/webhook';
import uploadRoutes from './routes/upload';
import logger from './utils/logger';

const prisma = new PrismaClient();
const app = express();

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
// raw body for stripe webhook
app.use('/api/webhook', express.raw({ type: 'application/json' }));
// serve uploads
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

const loginLimiter = rateLimit({ windowMs: 60*1000, max: 5, message: { error: 'Too many login attempts' } });
app.use('/api/auth/login', loginLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info({msg: 'Backend (TS) listening', port: PORT}));
