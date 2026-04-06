import nodemailer from 'nodemailer';

/**
 * Service to handle sending emails.
 */
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Sends a booking confirmation email to the user.
   * 
   * @param {Object} user - The user object (name, email).
   * @param {Object} service - The booked service object (title).
   * @param {Object} booking - The booking details (startDate, endDate, totalPrice).
   * @returns {Promise<void>}
   */
  async sendBookingConfirmation(user, service, booking) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email credentials not provided. Skipping email notification.');
      return;
    }

    const mailOptions = {
      from: `"EventHub" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Booking Confirmation - EventHub',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; borderRadius: 12px;">
          <h2 style="color: #8b5cf6;">Booking Confirmed!</h2>
          <p>Hi ${user.name},</p>
          <p>Your booking for <strong>${service.title}</strong> has been successfully confirmed.</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Details:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>📅 Start Date: ${new Date(booking.startDate).toDateString()}</li>
              <li>📅 End Date: ${new Date(booking.endDate).toDateString()}</li>
              <li>💰 Total Price: ₹${booking.totalPrice.toLocaleString('en-IN')}</li>
            </ul>
          </div>
          
          <p>Thank you for choosing EventHub!</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 0.8rem; color: #64748b; text-align: center;">This is an automated message, please do not reply.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${user.email}`);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }
}

export { EmailService };
