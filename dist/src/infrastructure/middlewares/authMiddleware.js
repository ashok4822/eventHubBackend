"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const AppErrors_1 = require("../../application/errors/AppErrors");
/**
 * Middleware for authentication and authorization.
 * Follows DIP by depending on TokenService port.
 */
class AuthMiddleware {
    constructor(tokenService) {
        this.tokenService = tokenService;
        /**
         * Protects routes by verifying the JWT access token.
         */
        this.protect = (req, res, next) => {
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                try {
                    token = req.headers.authorization.split(' ')[1];
                    const decoded = this.tokenService.verifyAccessToken(token);
                    req.user = {
                        id: decoded.id,
                        role: decoded.role,
                    };
                    return next();
                }
                catch (error) {
                    throw new AppErrors_1.UnauthorizedError('Not authorized, token failed');
                }
            }
            if (!token) {
                throw new AppErrors_1.UnauthorizedError('Not authorized, no token');
            }
        };
        /**
         * Restricts access to admin users only.
         */
        this.admin = (req, res, next) => {
            if (req.user && req.user.role === 'admin') {
                next();
            }
            else {
                throw new AppErrors_1.ForbiddenError('Not authorized as an admin');
            }
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map