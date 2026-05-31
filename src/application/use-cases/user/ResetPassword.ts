import { IUserRepository } from '../../ports/IUserRepository';
import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { IResetPassword } from '../../ports/IUseCases';
import { BadRequestError } from '../../errors/AppErrors';

/**
 * Use case for resetting a password using a token.
 */
export class ResetPassword implements IResetPassword {
  constructor(
    private _userRepository: IUserRepository,
    private _passwordHasher: IPasswordHasher
  ) {}

  async execute(token: string, password: string): Promise<void> {
    if (!token || !password) {
      throw new BadRequestError('Token and password are required');
    }

    const user = await this._userRepository.findByResetToken(token);
    if (!user) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    user.password = await this._passwordHasher.hash(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await this._userRepository.save(user);
  }
}
