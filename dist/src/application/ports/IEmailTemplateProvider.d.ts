import { IBooking } from '../../domain/entities/Booking';
import { IService } from '../../domain/entities/Service';
import { IUser } from '../../domain/entities/User';
export interface IEmailTemplate {
    subject: string;
    html: string;
}
export interface IEmailTemplateProvider {
    getBookingConfirmationTemplate(user: IUser, service: IService, booking: IBooking): IEmailTemplate;
    getPasswordResetTemplate(user: IUser, resetLink: string): IEmailTemplate;
}
//# sourceMappingURL=IEmailTemplateProvider.d.ts.map