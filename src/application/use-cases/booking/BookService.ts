import { BookingRepository } from '../../ports/BookingRepository';
import { ServiceRepository } from '../../ports/ServiceRepository';
import { UserRepository } from '../../ports/UserRepository';
import { EventBus } from '../../ports/EventBus';
import Booking from '../../../domain/entities/Booking';
import { BadRequestError, NotFoundError } from '../../errors/AppErrors';
import { BOOKING_EVENTS, BookingCreatedEventData } from '../../events/BookingEvents';
import { IBookService } from '../../ports/IUseCases';
import { BookingDTO, CreateBookingRequestDTO } from '../../dtos/BookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for booking a service.
 * Refactored to follow SOLID principles:
 * - Decoupled from EmailService (SRP/OCP) via EventBus.
 * - Uses Domain Entity for business validation (Domain Richness).
 */
export class BookService implements IBookService {
  constructor(
    private bookingRepository: BookingRepository,
    private serviceRepository: ServiceRepository,
    private userRepository: UserRepository,
    private eventBus: EventBus
  ) {}

  async execute({ userId, serviceId, startDate, endDate }: CreateBookingRequestDTO): Promise<BookingDTO> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Business validation moved to Domain Entity
    try {
      Booking.validateDates(start, end);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }

    const [user, service] = await Promise.all([
      this.userRepository.findById(userId),
      this.serviceRepository.findById(serviceId),
    ]);

    if (!user) throw new NotFoundError('User not found');
    if (!service) throw new NotFoundError('Service not found');

    // Price calculation in Domain Entity
    const totalPrice = Booking.calculateTotalPrice(start, end, service.pricePerDay);

    const booking = await this.bookingRepository.save({
      userId,
      serviceId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    // Emit event for side effects (e.g., email notification)
    const eventData: BookingCreatedEventData = {
      booking,
      user,
      service,
    };
    
    this.eventBus.emit(BOOKING_EVENTS.CREATED, eventData);

    return AppMapper.toBookingDTO(booking);
  }
}

