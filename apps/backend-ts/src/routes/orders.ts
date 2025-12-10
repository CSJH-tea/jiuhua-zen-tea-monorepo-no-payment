
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();

router.post('/create-order', requireAuth, async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid items' });
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    const total = items.reduce((sum: number, it: any) => {
      const p = products.find(pp => pp.id === it.productId);
      return sum + (p?.priceCents || 0) * it.quantity;
    }, 0);
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalCents: total,
        currency: 'CNY',
        status: 'CREATED'
      }
    });
    res.json({ success: true, orderId: order.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
