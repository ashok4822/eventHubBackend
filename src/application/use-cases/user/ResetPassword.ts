import { UserRepository } from '../../ports/UserRepository';
import { PasswordHasher } from '../../ports/PasswordHasher';
import { IResetPassword } from '../../ports/IUseCases';
import { BadRequestError } from '../../errors/AppErrors';

/**
 * Use case for resetting a password using a token.
 */
export class ResetPassword implements IResetPassword {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(token: string, password: string): Promise<void> {
    if (!token || !password) {
      throw new BadRequestError('Token and password are required');
    }

    const user = await this.userRepository.findByResetToken(token);
    if (!user) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    user.password = await this.passwordHasher.hash(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await this.userRepository.save(user);
  }
}
