"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = void 0;
/**
 * Centralized response and error message constants.
 * Use these instead of hardcoded strings across controllers and middlewares.
 */
exports.MESSAGES = {
    AUTH: {
        REGISTERED: 'User registered successfully',
        LOGGED_IN: 'Logged in successfully',
        LOGGED_OUT: 'Logged out successfully',
        INVALID_TOKEN: 'Invalid token',
        TOKEN_EXPIRED: 'Token expired',
        REFRESH_TOKEN_MISSING: 'Refresh token missing',
    },
    SERVICE: {
        DELETED: 'Service deleted successfully',
    },
};
//# sourceMappingURL=messages.js.map