import { EmailService } from '../ports/EmailService';
import { EventBus } from '../ports/EventBus';
import { Logger } from '../ports/Logger';
/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
export declare class EmailNotificationHandler {
    private emailService;
    private eventBus;
    private logger;
    constructor(emailService: EmailService, eventBus: EventBus, logger: Logger);
    /**
     * Starts listening for events.
     */
    listen(): void;
    private handleBookingCreated;
}
//# sourceMappingURL=EmailNotificationHandler.d.ts.map