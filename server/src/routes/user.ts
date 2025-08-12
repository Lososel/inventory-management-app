import { Router } from 'express';
import { requireAuth, requireRole } from '../auth/jwt.js';
import { prisma } from '../db/prisma.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.auth!.sub } });
  res.json({ id: user?.id, email: user?.email, role: req.auth!.role });
});

router.get('/admin/ping', requireAuth, requireRole('ADMIN'), (_req, res) => {
  res.json({ ok: true });
});

export default router;