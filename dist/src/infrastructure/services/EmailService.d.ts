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
export declare class EmailService implements IEmailService {
    private config;
    private templateProvider;
    private transporter;
    constructor(config: IEmailConfig, templateProvider: EmailTemplateProvider);
    sendBookingConfirmation(user: UserInfo, service: ServiceInfo, booking: BookingInfo): Promise<void>;
}
export {};
//# sourceMappingURL=EmailService.d.ts.map