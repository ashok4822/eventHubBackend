import { IUserRepository } from '../../ports/UserRepository';
import { IEmailService } from '../../ports/EmailService';
import { IRequestPasswordReset } from '../../ports/IUseCases';
import crypto from 'crypto';

/**
 * Use case for requesting a password reset.
 */
export class RequestPasswordReset implements IRequestPasswordReset {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {}

  async execute(email: string): Promise<void> {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // We don't want to reveal if a user exists or not for security reasons
      // but in this case we just return.
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;

    await this.userRepository.save(user);

    await this.emailService.sendPasswordResetEmail(user, resetToken);
  }
}
