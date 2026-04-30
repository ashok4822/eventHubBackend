import { rateLimit } from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

// Global rate limiter for all API requests
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    res.status(options.statusCode).json({
      message: options.message?.message || options.message,
    });
  },
});

// Stricter rate limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    res.status(options.statusCode).json({
      message: options.message?.message || options.message,
    });
  },
});
