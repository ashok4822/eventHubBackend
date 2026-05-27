import { IEmailService } from '../ports/EmailService';
import { IEventBus } from '../ports/EventBus';
import { ILogger } from '../ports/ILogger';
/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
export declare class EmailNotificationHandler {
    private emailService;
    private eventBus;
    private logger;
    constructor(emailService: IEmailService, eventBus: IEventBus, logger: ILogger);
    /**
     * Starts listening for events.
     */
    listen(): void;
    private handleBookingCreated;
}
//# sourceMappingURL=EmailNotificationHandler.d.ts.map