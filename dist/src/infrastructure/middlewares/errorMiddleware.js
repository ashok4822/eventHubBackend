"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppErrors_1 = require("../../application/errors/AppErrors");
const statusCodes_1 = require("../../interfaces/constants/statusCodes");
const messages_1 = require("../../interfaces/constants/messages");
/**
 * Global error handling middleware for Express.
 * Maps application errors to HTTP responses.
 */
const errorMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${err.name}: ${err.message}`);
    if (err instanceof AppErrors_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.name,
            message: err.message,
        });
    }
    // Handle Mongoose validation errors if any leak through
    if (err.name === 'ValidationError') {
        return res.status(statusCodes_1.STATUS_CODES.BAD_REQUEST).json({
            success: false,
            error: 'ValidationError',
            message: err.message,
        });
    }
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(statusCodes_1.STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            error: 'Unauthorized',
            message: messages_1.MESSAGES.AUTH.INVALID_TOKEN,
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(statusCodes_1.STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            error: 'Unauthorized',
            message: messages_1.MESSAGES.AUTH.TOKEN_EXPIRED,
        });
    }
    // Default to 500 Internal Server Error
    const statusCode = statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        success: false,
        error: 'InternalServerError',
        message: process.env.NODE_ENV === 'production'
            ? 'An unexpected error occurred'
            : err.message,
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map