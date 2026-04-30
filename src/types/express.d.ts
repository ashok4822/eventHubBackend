import { Request } from 'express';

// Augment Express Request to include authenticated user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export {};
