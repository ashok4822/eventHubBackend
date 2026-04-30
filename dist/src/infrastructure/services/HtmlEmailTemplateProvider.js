"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlEmailTemplateProvider = void 0;
class HtmlEmailTemplateProvider {
    getBookingConfirmationTemplate(user, service, booking) {
        return {
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
    }
}
exports.HtmlEmailTemplateProvider = HtmlEmailTemplateProvider;
//# sourceMappingURL=HtmlEmailTemplateProvider.js.map