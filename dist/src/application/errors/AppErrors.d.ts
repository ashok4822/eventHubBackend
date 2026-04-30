/**
 * Base class for all application-specific errors.
 */
export declare class AppError extends Error {
    message: string;
    statusCode: number;
    constructor(message: string, statusCode?: number);
}
/**
 * Thrown when client provided invalid data.
 */
export declare class BadRequestError extends AppError {
    constructor(message?: string);
}
/**
 * Thrown when authentication is required or failed.
 */
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
/**
 * Thrown when user lacks permissions for an action.
 */
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
/**
 * Thrown when a requested resource is not found.
 */
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
/**
 * Thrown when an operation conflicts with existing state (e.g., duplicate user).
 */
export declare class ConflictError extends AppError {
    constructor(message: string);
}
//# sourceMappingURL=AppErrors.d.ts.map