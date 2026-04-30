/**
 * Centralized response and error message constants.
 * Use these instead of hardcoded strings across controllers and middlewares.
 */
export declare const MESSAGES: {
    readonly AUTH: {
        readonly REGISTERED: "User registered successfully";
        readonly LOGGED_IN: "Logged in successfully";
        readonly LOGGED_OUT: "Logged out successfully";
        readonly INVALID_TOKEN: "Invalid token";
        readonly TOKEN_EXPIRED: "Token expired";
        readonly REFRESH_TOKEN_MISSING: "Refresh token missing";
    };
    readonly SERVICE: {
        readonly DELETED: "Service deleted successfully";
    };
};
//# sourceMappingURL=messages.d.ts.map