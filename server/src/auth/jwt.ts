import jwt from 'jsonwebtoken';
import type { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { config } from '../config/config.js';

const ACCESS_SECRET: Secret = config.jwt.secret;
const ttl = config.jwt.ttl;

export type AccessPayload = JwtPayload & {
  sub: string;
  role: 'USER' | 'ADMIN';
};

export function issueAccessToken(sub: string, role: 'USER' | 'ADMIN') {
  const opts: SignOptions = { expiresIn: ttl };
  return jwt.sign({ sub, role }, ACCESS_SECRET, opts);
}

export function requireAuth(
  req: Request & { auth?: AccessPayload },
  res: Response,
  next: NextFunction
) {
  const header = req.header('Authorization');
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token' });
  }

  const token = header.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as AccessPayload;
    if (!decoded?.sub) return res.status(401).json({ error: 'Invalid token' });
    req.auth = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(role: 'ADMIN') {
  return (req: Request & { auth?: AccessPayload }, res: Response, next: NextFunction) => {
    if (!req.auth) return res.status(401).json({ error: 'No token' });
    if (req.auth.role !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
