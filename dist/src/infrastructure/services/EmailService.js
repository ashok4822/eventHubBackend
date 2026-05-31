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
    constructor(_config, _templateProvider, _logger) {
        this._config = _config;
        this._templateProvider = _templateProvider;
        this._logger = _logger;
        this._transporter = nodemailer_1.default.createTransport({
            service: this._config.service,
            auth: {
                user: this._config.auth.user,
                pass: this._config.auth.pass,
            },
        });
    }
    async sendBookingConfirmation(user, service, booking) {
        if (!this._config.auth.user || !this._config.auth.pass) {
            this._logger.warn('Email credentials not provided. Skipping email notification.');
            return;
        }
        const { subject, html } = this._templateProvider.getBookingConfirmationTemplate(user, service, booking);
        const mailOptions = {
            from: `"EventHub" <${this._config.auth.user}>`,
            to: user.email,
            subject,
            html,
        };
        try {
            await this._transporter.sendMail(mailOptions);
            this._logger.info(`Confirmation email sent to ${user.email}`);
        }
        catch (error) {
            this._logger.error('Error sending confirmation email:', error);
        }
    }
    async sendPasswordResetEmail(user, resetToken) {
        if (!this._config.auth.user || !this._config.auth.pass) {
            this._logger.warn('Email credentials not provided. Skipping email notification.');
            this._logger.info(`Reset Token for ${user.email}: ${resetToken}`);
            return;
        }
        const resetLink = `${this._config.frontendUrl}/reset-password/${resetToken}`;
        const { subject, html } = this._templateProvider.getPasswordResetTemplate(user, resetLink);
        const mailOptions = {
            from: `"EventHub" <${this._config.auth.user}>`,
            to: user.email,
            subject,
            html,
        };
        try {
            await this._transporter.sendMail(mailOptions);
            this._logger.info(`Password reset email sent to ${user.email}`);
        }
        catch (error) {
            this._logger.error('Error sending password reset email:', error);
        }
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailService.js.map