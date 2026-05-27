import { IEmailService } from '../ports/EmailService';
import { IEventBus } from '../ports/EventBus';
import { BOOKING_EVENTS, IBookingCreatedEventData } from '../events/BookingEvents';
import { ILogger } from '../ports/ILogger';

/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
export class EmailNotificationHandler {
  constructor(
    private emailService: IEmailService,
    private eventBus: IEventBus,
    private logger: ILogger
  ) {}

  /**
   * Starts listening for events.
   */
  public listen(): void {
    this.eventBus.on(BOOKING_EVENTS.CREATED, (data: unknown) => {
      this.handleBookingCreated(data as IBookingCreatedEventData);
    });
  }

  private async handleBookingCreated(data: IBookingCreatedEventData): Promise<void> {
    try {
      this.logger.info(`Sending confirmation email for booking ${data.booking.id}`);
      await this.emailService.sendBookingConfirmation(data.user, data.service, data.booking);
    } catch (error) {
      this.logger.error('Failed to send booking confirmation email via handler', error);
    }
  }
}
