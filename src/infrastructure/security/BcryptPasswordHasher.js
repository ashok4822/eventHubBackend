import bcrypt from 'bcryptjs';
import { PasswordHasher } from '../../application/ports/PasswordHasher.js';

/**
 * Concrete implementation of PasswordHasher using bcryptjs.
 */
class BcryptPasswordHasher extends PasswordHasher {
  /**
   * Hashes a password with bcryptjs.
   * @param {string} password - The plain-text password.
   * @returns {Promise<string>} The hashed password.
   */
  async hash(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Compares a password with a hash using bcryptjs.
   * @param {string} password - The plain-text password.
   * @param {string} hash - The hashed password.
   * @returns {Promise<boolean>} True if it matches, false otherwise.
   */
  async compare(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

export { BcryptPasswordHasher };
