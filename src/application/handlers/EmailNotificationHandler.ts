import { EmailService } from '../ports/EmailService';
import { EventBus } from '../ports/EventBus';
import { BOOKING_EVENTS, BookingCreatedEventData } from '../events/BookingEvents';
import { Logger } from '../ports/Logger';

/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
export class EmailNotificationHandler {
  constructor(
    private emailService: EmailService,
    private eventBus: EventBus,
    private logger: Logger
  ) {}

  /**
   * Starts listening for events.
   */
  public listen(): void {
    this.eventBus.on(BOOKING_EVENTS.CREATED, (data: BookingCreatedEventData) => {
      this.handleBookingCreated(data);
    });
  }

  private async handleBookingCreated(data: BookingCreatedEventData): Promise<void> {
    try {
      this.logger.info(`Sending confirmation email for booking ${data.booking.id}`);
      await this.emailService.sendBookingConfirmation(data.user, data.service, data.booking);
    } catch (error) {
      this.logger.error('Failed to send booking confirmation email via handler', error);
    }
  }
}
