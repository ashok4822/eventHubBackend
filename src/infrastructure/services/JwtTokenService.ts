import jwt from 'jsonwebtoken';
import { TokenService, TokenPayload } from '../../application/ports/TokenService';

/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
export class JwtTokenService extends TokenService {
  constructor(
    private accessSecret: string,
    private refreshSecret: string
  ) {
    super();
  }

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload as object, this.accessSecret, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload as object, this.refreshSecret, { expiresIn: '7d' });
  }


  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, this.accessSecret) as TokenPayload;
  }

  verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, this.refreshSecret) as TokenPayload;
  }
}
