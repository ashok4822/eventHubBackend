"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.AppError = void 0;
/**
 * Base class for all application-specific errors.
 */
class AppError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
/**
 * Thrown when client provided invalid data.
 */
class BadRequestError extends AppError {
    constructor(message = 'Bad Request') {
        super(message);
    }
}
exports.BadRequestError = BadRequestError;
/**
 * Thrown when authentication is required or failed.
 */
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Thrown when user lacks permissions for an action.
 */
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Thrown when a requested resource is not found.
 */
class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Thrown when an operation conflicts with existing state (e.g., duplicate user).
 */
class ConflictError extends AppError {
    constructor(message) {
        super(message);
    }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=AppErrors.js.map