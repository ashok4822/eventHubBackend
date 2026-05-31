import { Request, Response, NextFunction } from 'express';
import { 
  AppError, 
  BadRequestError, 
  UnauthorizedError, 
  ForbiddenError, 
  NotFoundError, 
  ConflictError 
} from '../../application/errors/AppErrors';
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
  _next: NextFunction
) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  if (err instanceof AppError) {
    let statusCode: number = STATUS_CODES.INTERNAL_SERVER_ERROR;

    if (err instanceof BadRequestError) statusCode = STATUS_CODES.BAD_REQUEST;
    else if (err instanceof UnauthorizedError) statusCode = STATUS_CODES.UNAUTHORIZED;
    else if (err instanceof ForbiddenError) statusCode = STATUS_CODES.FORBIDDEN;
    else if (err instanceof NotFoundError) statusCode = STATUS_CODES.NOT_FOUND;
    else if (err instanceof ConflictError) statusCode = STATUS_CODES.CONFLICT;

    return res.status(statusCode).json({
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

  // Handle MongoDB duplicate key errors (e.g., two concurrent booking inserts
  // that both slip past the application-layer overlap check and hit the unique
  // compound index on { serviceId, startDate, endDate }).
  if ((err as NodeJS.ErrnoException & { code?: number }).code === 11000) {
    return res.status(STATUS_CODES.CONFLICT).json({
      success: false,
      error: 'ConflictError',
      message: 'This service is already booked for the selected dates. Please choose different dates.',
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

