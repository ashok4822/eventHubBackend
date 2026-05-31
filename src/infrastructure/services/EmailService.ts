import nodemailer from 'nodemailer';
import { IEmailConfig } from '../../application/ports/IAppConfig';
import { IEmailTemplateProvider } from '../../application/ports/IEmailTemplateProvider';
import { ILogger } from '../../application/ports/ILogger';
import { IEmailService } from '../../application/ports/IEmailService';

import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';


/**
 * Service to handle sending emails.
 */
export class EmailService implements IEmailService {
  private _transporter: nodemailer.Transporter;

  constructor(
    private _config: IEmailConfig,
    private _templateProvider: IEmailTemplateProvider,
    private _logger: ILogger
  ) {
    this._transporter = nodemailer.createTransport({
      service: this._config.service,
      auth: {
        user: this._config.auth.user,
        pass: this._config.auth.pass,
      },
    });
  }

  async sendBookingConfirmation(
    user: IUser,
    service: IService,
    booking: IBooking
  ): Promise<void> {
    if (!this._config.auth.user || !this._config.auth.pass) {
      this._logger.warn('Email credentials not provided. Skipping email notification.');
      return;
    }

    const { subject, html } = this._templateProvider.getBookingConfirmationTemplate(user, service, booking);

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"EventHub" <${this._config.auth.user}>`,
      to: user.email,
      subject,
      html,
    };

    try {
      await this._transporter.sendMail(mailOptions);
      this._logger.info(`Confirmation email sent to ${user.email}`);
    } catch (error) {
      this._logger.error('Error sending confirmation email:', error);
    }
  }

  async sendPasswordResetEmail(user: IUser, resetToken: string): Promise<void> {
    if (!this._config.auth.user || !this._config.auth.pass) {
      this._logger.warn('Email credentials not provided. Skipping email notification.');
      this._logger.info(`Reset Token for ${user.email}: ${resetToken}`);
      return;
    }

    const resetLink = `${this._config.frontendUrl}/reset-password/${resetToken}`;
    const { subject, html } = this._templateProvider.getPasswordResetTemplate(user, resetLink);

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"EventHub" <${this._config.auth.user}>`,
      to: user.email,
      subject,
      html,
    };

    try {
      await this._transporter.sendMail(mailOptions);
      this._logger.info(`Password reset email sent to ${user.email}`);
    } catch (error) {
      this._logger.error('Error sending password reset email:', error);
    }
  }
}
