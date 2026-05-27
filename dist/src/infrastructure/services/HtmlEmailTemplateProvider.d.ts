import { IBooking } from '../../domain/entities/Booking';
import { IService } from '../../domain/entities/Service';
import { IUser } from '../../domain/entities/User';
import { IEmailTemplate, IEmailTemplateProvider } from '../../application/ports/EmailTemplateProvider';
export declare class HtmlEmailTemplateProvider implements IEmailTemplateProvider {
    getBookingConfirmationTemplate(user: IUser, service: IService, booking: IBooking): IEmailTemplate;
    getPasswordResetTemplate(user: IUser, resetLink: string): IEmailTemplate;
}
//# sourceMappingURL=HtmlEmailTemplateProvider.d.ts.map