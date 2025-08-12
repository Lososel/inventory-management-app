import type { AccessPayload } from '../auth/jwt';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: AccessPayload;
  }
}
