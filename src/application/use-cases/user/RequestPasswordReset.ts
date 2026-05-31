import { IUserRepository } from '../../ports/IUserRepository';
import { IEmailService } from '../../ports/IEmailService';
import { IRequestPasswordReset } from '../../ports/IUseCases';
import crypto from 'crypto';

/**
 * Use case for requesting a password reset.
 */
export class RequestPasswordReset implements IRequestPasswordReset {
  constructor(
    private _userRepository: IUserRepository,
    private _emailService: IEmailService
  ) {}

  async execute(email: string): Promise<void> {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      // We don't want to reveal if a user exists or not for security reasons
      // but in this case we just return.
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;

    await this._userRepository.save(user);

    await this._emailService.sendPasswordResetEmail(user, resetToken);
  }
}
