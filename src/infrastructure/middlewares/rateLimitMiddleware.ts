import { rateLimit } from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

// Global rate limiter for all API requests
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction, options: Record<string, unknown>) => {
    const opts = options as unknown as { statusCode: number; message: string | { message: string } };
    const message = typeof opts.message === 'object' ? opts.message.message : opts.message;
    res.status(opts.statusCode).json({
      message: message,
    });
  },
});

// Stricter rate limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction, options: Record<string, unknown>) => {
    const opts = options as unknown as { statusCode: number; message: string | { message: string } };
    const message = typeof opts.message === 'object' ? opts.message.message : opts.message;
    res.status(opts.statusCode).json({
      message: message,
    });
  },
});
