/**
 * Interface for password hashing and verification.
 * This port defines the requirements for any password hashing implementation.
 */
class PasswordHasher {
  /**
   * Hashes a plain-text password.
   * @param {string} password - The plain-text password.
   * @returns {Promise<string>} The hashed password.
   */
  async hash(password) {
    throw new Error('Method not implemented');
  }

  /**
   * Compares a plain-text password with a hash.
   * @param {string} password - The plain-text password.
   * @param {string} hash - The hashed password.
   * @returns {Promise<boolean>} True if it matches, false otherwise.
   */
  async compare(password, hash) {
    throw new Error('Method not implemented');
  }
}

export { PasswordHasher };
