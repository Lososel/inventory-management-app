import * as jwt from 'jsonwebtoken';
import type { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET ?? '';
if (!ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET is not set');
}

export type AccessPayload = JwtPayload & {
  sub: string;
  role: 'USER' | 'ADMIN';
};

export function issueAccessToken(sub: string, role: 'USER' | 'ADMIN') {
  const expiresInSeconds =
    process.env.JWT_ACCESS_TTL ? Number(process.env.JWT_ACCESS_TTL) : 15 * 60;
  const opts: SignOptions = { expiresIn: expiresInSeconds };
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
