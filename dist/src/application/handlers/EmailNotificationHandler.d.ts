import { IEmailService } from '../ports/IEmailService';
import { IEventBus } from '../ports/IEventBus';
import { ILogger } from '../ports/ILogger';
/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
export declare class EmailNotificationHandler {
    private _emailService;
    private _eventBus;
    private _logger;
    constructor(_emailService: IEmailService, _eventBus: IEventBus, _logger: ILogger);
    /**
     * Starts listening for events.
     */
    listen(): void;
    private _handleBookingCreated;
}
//# sourceMappingURL=EmailNotificationHandler.d.ts.map