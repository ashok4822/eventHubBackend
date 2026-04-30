"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationHandler = void 0;
const BookingEvents_1 = require("../events/BookingEvents");
/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
class EmailNotificationHandler {
    constructor(emailService, eventBus, logger) {
        this.emailService = emailService;
        this.eventBus = eventBus;
        this.logger = logger;
    }
    /**
     * Starts listening for events.
     */
    listen() {
        this.eventBus.on(BookingEvents_1.BOOKING_EVENTS.CREATED, (data) => {
            this.handleBookingCreated(data);
        });
    }
    async handleBookingCreated(data) {
        try {
            this.logger.info(`Sending confirmation email for booking ${data.booking.id}`);
            await this.emailService.sendBookingConfirmation(data.user, data.service, data.booking);
        }
        catch (error) {
            this.logger.error('Failed to send booking confirmation email via handler', error);
        }
    }
}
exports.EmailNotificationHandler = EmailNotificationHandler;
//# sourceMappingURL=EmailNotificationHandler.js.map