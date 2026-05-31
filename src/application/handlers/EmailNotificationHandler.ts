import { IEmailService } from '../ports/IEmailService';
import { IEventBus } from '../ports/IEventBus';
import { BOOKING_EVENTS, IBookingCreatedEventData } from '../events/BookingEvents';
import { ILogger } from '../ports/ILogger';

/**
 * Handler that reacts to booking events and sends email notifications.
 * This decouples the core booking logic from the notification system.
 */
export class EmailNotificationHandler {
  constructor(
    private _emailService: IEmailService,
    private _eventBus: IEventBus,
    private _logger: ILogger
  ) {}

  /**
   * Starts listening for events.
   */
  public listen(): void {
    this._eventBus.on(BOOKING_EVENTS.CREATED, (data: unknown) => {
      this._handleBookingCreated(data as IBookingCreatedEventData);
    });
  }

  private async _handleBookingCreated(data: IBookingCreatedEventData): Promise<void> {
    try {
      this._logger.info(`Sending confirmation email for booking ${data.booking.id}`);
      await this._emailService.sendBookingConfirmation(data.user, data.service, data.booking);
    } catch (error) {
      this._logger.error('Failed to send booking confirmation email via handler', error);
    }
  }
}
