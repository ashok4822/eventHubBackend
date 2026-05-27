import { IEmailConfig } from '../../application/ports/IAppConfig';
import { IEmailTemplateProvider } from '../../application/ports/EmailTemplateProvider';
import { ILogger } from '../../application/ports/ILogger';
import { IEmailService } from '../../application/ports/EmailService';
import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
/**
 * Service to handle sending emails.
 */
export declare class EmailService implements IEmailService {
    private config;
    private templateProvider;
    private logger;
    private transporter;
    constructor(config: IEmailConfig, templateProvider: IEmailTemplateProvider, logger: ILogger);
    sendBookingConfirmation(user: IUser, service: IService, booking: IBooking): Promise<void>;
    sendPasswordResetEmail(user: IUser, resetToken: string): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map