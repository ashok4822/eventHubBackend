export interface EmailTemplate {
  subject: string;
  html: string;
}

export interface EmailTemplateProvider {
  getBookingConfirmationTemplate(user: any, service: any, booking: any): EmailTemplate;
  getPasswordResetTemplate(user: any, resetLink: string): EmailTemplate;
}
