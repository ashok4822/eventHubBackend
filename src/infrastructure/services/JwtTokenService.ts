import jwt from 'jsonwebtoken';
import { ITokenService, ITokenPayload } from '../../application/ports/ITokenService';

/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
export class JwtTokenService extends ITokenService {
  constructor(
    private accessSecret: string,
    private refreshSecret: string
  ) {
    super();
  }

  generateAccessToken(payload: ITokenPayload): string {
    return jwt.sign(payload as object, this.accessSecret, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload as object, this.refreshSecret, { expiresIn: '7d' });
  }


  verifyAccessToken(token: string): ITokenPayload {
    return jwt.verify(token, this.accessSecret) as ITokenPayload;
  }

  verifyRefreshToken(token: string): ITokenPayload {
    return jwt.verify(token, this.refreshSecret) as ITokenPayload;
  }
}
