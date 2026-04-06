/**
 * Interface for token generation and verification.
 * This port defines the requirements for any token management implementation.
 */
class TokenService {
  /**
   * Generates an Access Token for a user.
   * @param {Object} payload - The token payload.
   * @returns {string} The signed access token.
   */
  generateAccessToken(payload) {
    throw new Error('Method not implemented');
  }

  /**
   * Generates a Refresh Token for a user.
   * @param {Object} payload - The token payload.
   * @returns {string} The signed refresh token.
   */
  generateRefreshToken(payload) {
    throw new Error('Method not implemented');
  }

  /**
   * Verifies a token and returns the decoded payload.
   * @param {string} token - The token to verify.
   * @param {string} secret - The secret used to sign the token.
   * @returns {Object} The decoded payload.
   */
  verifyToken(token, secret) {
    throw new Error('Method not implemented');
  }
}

export { TokenService };
