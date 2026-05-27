"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Service to handle sending emails.
 */
class EmailService {
    constructor(config, templateProvider, logger) {
        this.config = config;
        this.templateProvider = templateProvider;
        this.logger = logger;
        this.transporter = nodemailer_1.default.createTransport({
            service: this.config.service,
            auth: {
                user: this.config.auth.user,
                pass: this.config.auth.pass,
            },
        });
    }
    async sendBookingConfirmation(user, service, booking) {
        if (!this.config.auth.user || !this.config.auth.pass) {
            this.logger.warn('Email credentials not provided. Skipping email notification.');
            return;
        }
        const { subject, html } = this.templateProvider.getBookingConfirmationTemplate(user, service, booking);
        const mailOptions = {
            from: `"EventHub" <${this.config.auth.user}>`,
            to: user.email,
            subject,
            html,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.info(`Confirmation email sent to ${user.email}`);
        }
        catch (error) {
            this.logger.error('Error sending confirmation email:', error);
        }
    }
    async sendPasswordResetEmail(user, resetToken) {
        if (!this.config.auth.user || !this.config.auth.pass) {
            this.logger.warn('Email credentials not provided. Skipping email notification.');
            this.logger.info(`Reset Token for ${user.email}: ${resetToken}`);
            return;
        }
        const resetLink = `${this.config.frontendUrl}/reset-password/${resetToken}`;
        const { subject, html } = this.templateProvider.getPasswordResetTemplate(user, resetLink);
        const mailOptions = {
            from: `"EventHub" <${this.config.auth.user}>`,
            to: user.email,
            subject,
            html,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.info(`Password reset email sent to ${user.email}`);
        }
        catch (error) {
            this.logger.error('Error sending password reset email:', error);
        }
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailService.js.map