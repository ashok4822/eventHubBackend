import jwt from 'jsonwebtoken';
import { TokenService } from '../../application/ports/TokenService.js';

/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
class JwtTokenService extends TokenService {
  /**
   * Generates a signed Access Token using jsonwebtoken.
   * @param {Object} payload - Token payload.
   * @returns {string} The signed access token.
   */
  generateAccessToken(payload) {
    const secret = process.env.JWT_ACCESS_SECRET || 'access_secret';
    return jwt.sign(payload, secret, { expiresIn: '15m' });
  }

  /**
   * Generates a signed Refresh Token using jsonwebtoken.
   * @param {Object} payload - Token payload.
   * @returns {string} The signed refresh token.
   */
  generateRefreshToken(payload) {
    const secret = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  }

  /**
   * Verifies a token and returns the decoded payload.
   * @param {string} token - The token to verify.
   * @param {string} secret - The secret used to sign the token.
   * @returns {Object} The decoded payload.
   */
  verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }
}

export { JwtTokenService };
