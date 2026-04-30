import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../application/errors/AppErrors';
import { STATUS_CODES } from '../../interfaces/constants/statusCodes';
import { MESSAGES } from '../../interfaces/constants/messages';

/**
 * Global error handling middleware for Express.
 * Maps application errors to HTTP responses.
 */
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.name,
      message: err.message,
    });
  }

  // Handle Mongoose validation errors if any leak through
  if (err.name === 'ValidationError') {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      error: 'ValidationError',
      message: err.message,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      error: 'Unauthorized',
      message: MESSAGES.AUTH.INVALID_TOKEN,
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      error: 'Unauthorized',
      message: MESSAGES.AUTH.TOKEN_EXPIRED,
    });
  }

  // Default to 500 Internal Server Error
  const statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    success: false,
    error: 'InternalServerError',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
  });
};
