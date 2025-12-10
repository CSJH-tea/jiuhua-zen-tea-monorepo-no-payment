import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();

const createSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().optional(),
  image: z.string().optional()
});

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.post('/', requireAuth, requireRole(['ADMIN','STAFF']), async (req, res) => {
  try {
    const data = createSchema.parse(req.body);
    const product = await prisma.product.create({ data });
    res.json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, requireRole(['ADMIN','STAFF']), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = createSchema.partial().parse(req.body);
    const product = await prisma.product.update({ where: { id }, data });
    res.json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, requireRole(['ADMIN']), async (req, res) => {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
