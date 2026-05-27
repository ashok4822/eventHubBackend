/**
 * Base class for all application-specific errors.
 */
export class AppError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Thrown when client provided invalid data.
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request') {
    super(message);
  }
}

/**
 * Thrown when authentication is required or failed.
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message);
  }
}

/**
 * Thrown when user lacks permissions for an action.
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message);
  }
}

/**
 * Thrown when a requested resource is not found.
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message);
  }
}

/**
 * Thrown when an operation conflicts with existing state (e.g., duplicate user).
 */
export class ConflictError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
