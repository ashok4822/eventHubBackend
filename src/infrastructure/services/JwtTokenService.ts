import jwt from 'jsonwebtoken';
import { ITokenService, ITokenPayload } from '../../application/ports/ITokenService';

/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
export class JwtTokenService extends ITokenService {
  constructor(
    private _accessSecret: string,
    private _refreshSecret: string
  ) {
    super();
  }

  generateAccessToken(payload: ITokenPayload): string {
    return jwt.sign(payload as object, this._accessSecret, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload as object, this._refreshSecret, { expiresIn: '7d' });
  }


  verifyAccessToken(token: string): ITokenPayload {
    return jwt.verify(token, this._accessSecret) as ITokenPayload;
  }

  verifyRefreshToken(token: string): ITokenPayload {
    return jwt.verify(token, this._refreshSecret) as ITokenPayload;
  }
}
