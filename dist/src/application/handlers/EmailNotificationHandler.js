"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationHandler = void 0;
const BookingEvents_1 = require("../events/BookingEvents");
/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
class EmailNotificationHandler {
    constructor(_emailService, _eventBus, _logger) {
        this._emailService = _emailService;
        this._eventBus = _eventBus;
        this._logger = _logger;
    }
    /**
     * Starts listening for events.
     */
    listen() {
        this._eventBus.on(BookingEvents_1.BOOKING_EVENTS.CREATED, (data) => {
            this._handleBookingCreated(data);
        });
    }
    async _handleBookingCreated(data) {
        try {
            this._logger.info(`Sending confirmation email for booking ${data.booking.id}`);
            await this._emailService.sendBookingConfirmation(data.user, data.service, data.booking);
        }
        catch (error) {
            this._logger.error('Failed to send booking confirmation email via handler', error);
        }
    }
}
exports.EmailNotificationHandler = EmailNotificationHandler;
//# sourceMappingURL=EmailNotificationHandler.js.map