export interface EmailTemplate {
    subject: string;
    html: string;
}
export interface EmailTemplateProvider {
    getBookingConfirmationTemplate(user: any, service: any, booking: any): EmailTemplate;
}
//# sourceMappingURL=EmailTemplateProvider.d.ts.map