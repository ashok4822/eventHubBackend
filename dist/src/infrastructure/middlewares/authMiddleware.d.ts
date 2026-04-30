import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../application/ports/TokenService';
/**
 * Middleware for authentication and authorization.
 * Follows DIP by depending on TokenService port.
 */
export declare class AuthMiddleware {
    private tokenService;
    constructor(tokenService: TokenService);
    /**
     * Protects routes by verifying the JWT access token.
     */
    protect: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Restricts access to admin users only.
     */
    admin: (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=authMiddleware.d.ts.map