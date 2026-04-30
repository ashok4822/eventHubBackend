import { Request, Response, NextFunction } from 'express';

/**
 * A wrapper for asynchronous middleware/controller functions to catch errors 
 * and pass them to the Express error handling middleware.
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
