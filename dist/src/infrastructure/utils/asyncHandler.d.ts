import { Request, Response, NextFunction } from 'express';
/**
 * A wrapper for asynchronous middleware/controller functions to catch errors
 * and pass them to the Express error handling middleware.
 */
export declare const asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown> | void | unknown) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=asyncHandler.d.ts.map