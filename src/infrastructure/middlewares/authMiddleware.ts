import { Request, Response, NextFunction } from 'express';
import { ITokenService } from '../../application/ports/ITokenService';
import { UnauthorizedError, ForbiddenError } from '../../application/errors/AppErrors';

/**
 * Middleware for authentication and authorization.
 * Follows DIP by depending on TokenService port.
 */
export class AuthMiddleware {
  constructor(private tokenService: ITokenService) {}

  /**
   * Protects routes by verifying the JWT access token.
   */
  public protect = (req: Request, res: Response, next: NextFunction): void => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = this.tokenService.verifyAccessToken(token);
        
        req.user = {
          id: decoded.id,
          role: decoded.role as string,
        };
        
        return next();
      } catch (_error) {
        throw new UnauthorizedError('Not authorized, token failed');
      }
    }

    if (!token) {
      throw new UnauthorizedError('Not authorized, no token');
    }
  };

  /**
   * Restricts access to admin users only.
   */
  public admin = (req: Request, _res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      throw new ForbiddenError('Not authorized as an admin');
    }
  };
}
