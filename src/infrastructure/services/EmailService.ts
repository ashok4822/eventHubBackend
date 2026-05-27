import nodemailer from 'nodemailer';
import { IEmailConfig } from '../../application/ports/IAppConfig';
import { IEmailTemplateProvider } from '../../application/ports/EmailTemplateProvider';
import { ILogger } from '../../application/ports/ILogger';
import { IEmailService } from '../../application/ports/EmailService';

import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';


/**
 * Service to handle sending emails.
 */
export class EmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private config: IEmailConfig,
    private templateProvider: IEmailTemplateProvider,
    private logger: ILogger
  ) {
    this.transporter = nodemailer.createTransport({
      service: this.config.service,
      auth: {
        user: this.config.auth.user,
        pass: this.config.auth.pass,
      },
    });
  }

  async sendBookingConfirmation(
    user: IUser,
    service: IService,
    booking: IBooking
  ): Promise<void> {
    if (!this.config.auth.user || !this.config.auth.pass) {
      this.logger.warn('Email credentials not provided. Skipping email notification.');
      return;
    }

    const { subject, html } = this.templateProvider.getBookingConfirmationTemplate(user, service, booking);

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"EventHub" <${this.config.auth.user}>`,
      to: user.email,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.info(`Confirmation email sent to ${user.email}`);
    } catch (error) {
      this.logger.error('Error sending confirmation email:', error);
    }
  }

  async sendPasswordResetEmail(user: IUser, resetToken: string): Promise<void> {
    if (!this.config.auth.user || !this.config.auth.pass) {
      this.logger.warn('Email credentials not provided. Skipping email notification.');
      this.logger.info(`Reset Token for ${user.email}: ${resetToken}`);
      return;
    }

    const resetLink = `${this.config.frontendUrl}/reset-password/${resetToken}`;
    const { subject, html } = this.templateProvider.getPasswordResetTemplate(user, resetLink);

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"EventHub" <${this.config.auth.user}>`,
      to: user.email,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.info(`Password reset email sent to ${user.email}`);
    } catch (error) {
      this.logger.error('Error sending password reset email:', error);
    }
  }
}
