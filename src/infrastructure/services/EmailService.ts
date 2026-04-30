import nodemailer from 'nodemailer';
import { IEmailConfig } from '../../application/ports/IAppConfig';
import { EmailTemplateProvider } from '../../application/ports/EmailTemplateProvider';

interface UserInfo {
  name: string;
  email: string;
}

interface ServiceInfo {
  title: string;
}

interface BookingInfo {
  startDate: string | Date;
  endDate: string | Date;
  totalPrice: number;
}

import { EmailService as IEmailService } from '../../application/ports/EmailService';

/**
 * Service to handle sending emails.
 */
export class EmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private config: IEmailConfig,
    private templateProvider: EmailTemplateProvider
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
    user: UserInfo,
    service: ServiceInfo,
    booking: BookingInfo
  ): Promise<void> {
    if (!this.config.auth.user || !this.config.auth.pass) {
      console.warn('Email credentials not provided. Skipping email notification.');
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
      console.log(`Confirmation email sent to ${user.email}`);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }

  async sendPasswordResetEmail(user: UserInfo, resetToken: string): Promise<void> {
    if (!this.config.auth.user || !this.config.auth.pass) {
      console.warn('Email credentials not provided. Skipping email notification.');
      console.log(`Reset Token for ${user.email}: ${resetToken}`);
      return;
    }

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const { subject, html } = this.templateProvider.getPasswordResetTemplate(user, resetLink);

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"EventHub" <${this.config.auth.user}>`,
      to: user.email,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to ${user.email}`);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}
