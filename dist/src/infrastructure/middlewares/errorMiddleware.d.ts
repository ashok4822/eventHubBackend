import { Request, Response, NextFunction } from 'express';
/**
 * Global error handling middleware for Express.
 * Maps application errors to HTTP responses.
 */
export declare const errorMiddleware: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=errorMiddleware.d.ts.map