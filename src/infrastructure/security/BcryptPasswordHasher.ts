import bcrypt from 'bcryptjs';
import { PasswordHasher } from '../../application/ports/PasswordHasher';

/**
 * Concrete implementation of PasswordHasher using bcryptjs.
 */
export class BcryptPasswordHasher extends PasswordHasher {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
