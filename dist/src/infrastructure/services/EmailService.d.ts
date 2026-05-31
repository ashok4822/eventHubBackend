import { IEmailConfig } from '../../application/ports/IAppConfig';
import { IEmailTemplateProvider } from '../../application/ports/IEmailTemplateProvider';
import { ILogger } from '../../application/ports/ILogger';
import { IEmailService } from '../../application/ports/IEmailService';
import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
/**
 * Service to handle sending emails.
 */
export declare class EmailService implements IEmailService {
    private _config;
    private _templateProvider;
    private _logger;
    private _transporter;
    constructor(_config: IEmailConfig, _templateProvider: IEmailTemplateProvider, _logger: ILogger);
    sendBookingConfirmation(user: IUser, service: IService, booking: IBooking): Promise<void>;
    sendPasswordResetEmail(user: IUser, resetToken: string): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map