import { IBookingRepository } from '../../ports/IBookingRepository';
import { IServiceRepository } from '../../ports/IServiceRepository';
import { IUserRepository } from '../../ports/IUserRepository';
import { IEventBus } from '../../ports/IEventBus';
import Booking from '../../../domain/entities/Booking';
import { BadRequestError, ConflictError, NotFoundError } from '../../errors/AppErrors';
import { BOOKING_EVENTS, IBookingCreatedEventData } from '../../events/BookingEvents';
import { IBookService } from '../../ports/IUseCases';
import { IBookingDTO, ICreateBookingRequestDTO } from '../../dtos/IBookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for booking a service.
 * Refactored to follow SOLID principles:
 * - Decoupled from EmailService (SRP/OCP) via EventBus.
 * - Uses Domain Entity for business validation (Domain Richness).
 */
export class BookService implements IBookService {
  constructor(
    private _bookingRepository: IBookingRepository,
    private _serviceRepository: IServiceRepository,
    private _userRepository: IUserRepository,
    private _eventBus: IEventBus
  ) {}

  async execute({ userId, serviceId, startDate, endDate }: ICreateBookingRequestDTO): Promise<IBookingDTO> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Business validation moved to Domain Entity
    try {
      Booking.validateDates(start, end);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Invalid dates';
      throw new BadRequestError(message);
    }

    const [user, service] = await Promise.all([
      this._userRepository.findById(userId),
      this._serviceRepository.findById(serviceId),
    ]);

    if (!user) throw new NotFoundError('User not found');
    if (!service) throw new NotFoundError('Service not found');

    // ── Concurrency Guard ────────────────────────────────────────────────────
    // Check for any confirmed bookings whose date range overlaps the requested
    // window BEFORE creating a new one.  Two simultaneous requests can still
    // both pass this check in theory, but the sparse index below (models.ts)
    // acts as the final atomic database-level guard.
    const overlapping = await this._bookingRepository.findOverlapping(serviceId, start, end);
    if (overlapping.length > 0) {
      throw new ConflictError(
        'This service is already booked for the selected dates. Please choose different dates.'
      );
    }
    // ────────────────────────────────────────────────────────────────────────

    // Price calculation in Domain Entity
    const totalPrice = Booking.calculateTotalPrice(start, end, service.pricePerDay);

    const booking = await this._bookingRepository.save({
      userId,
      serviceId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    // Emit event for side effects (e.g., email notification)
    const eventData: IBookingCreatedEventData = {
      booking,
      user,
      service,
    };
    
    this._eventBus.emit(BOOKING_EVENTS.CREATED, eventData);

    return AppMapper.toBookingDTO(booking);
  }
}

