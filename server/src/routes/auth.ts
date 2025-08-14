import { Router } from 'express';
import passport from '../auth/passport.js';
import { prisma } from '../db/prisma.js';
import { issueAccessToken } from '../auth/jwt.js';

const FRONTEND = process.env.FRONTEND_URL;

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed', session: false }),
  async (req, res) => {
    const id = (req.user as any)?.id as string;
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    const token = issueAccessToken(user.id, user.role);
    res.redirect(`${FRONTEND}/login?token=${token}`);
  }
);

router.get('/github', passport.authenticate('github', { session: false }));
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failed', session: false }),
  async (req, res) => {
    const id = (req.user as any)?.id as string;
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    const token = issueAccessToken(user.id, user.role);
    res.redirect(`${FRONTEND}/login?token=${token}`);
  }
);

router.get('/failed', (_req, res) => res.status(401).json({ error: 'OAuth failed' }));

export default router;
