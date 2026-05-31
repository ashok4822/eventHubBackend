import { Request, Response, NextFunction } from 'express';
import { ITokenService } from '../../application/ports/ITokenService';
/**
 * Middleware for authentication and authorization.
 * Follows DIP by depending on TokenService port.
 */
export declare class AuthMiddleware {
    private _tokenService;
    constructor(_tokenService: ITokenService);
    /**
     * Protects routes by verifying the JWT access token.
     */
    protect: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Restricts access to admin users only.
     */
    admin: (req: Request, _res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=authMiddleware.d.ts.map