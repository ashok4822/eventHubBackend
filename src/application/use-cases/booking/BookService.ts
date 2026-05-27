import { IBookingRepository } from '../../ports/BookingRepository';
import { IServiceRepository } from '../../ports/ServiceRepository';
import { IUserRepository } from '../../ports/UserRepository';
import { IEventBus } from '../../ports/EventBus';
import Booking from '../../../domain/entities/Booking';
import { BadRequestError, NotFoundError } from '../../errors/AppErrors';
import { BOOKING_EVENTS, IBookingCreatedEventData } from '../../events/BookingEvents';
import { IBookService } from '../../ports/IUseCases';
import { IBookingDTO, ICreateBookingRequestDTO } from '../../dtos/BookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for booking a service.
 * Refactored to follow SOLID principles:
 * - Decoupled from EmailService (SRP/OCP) via EventBus.
 * - Uses Domain Entity for business validation (Domain Richness).
 */
export class BookService implements IBookService {
  constructor(
    private bookingRepository: IBookingRepository,
    private serviceRepository: IServiceRepository,
    private userRepository: IUserRepository,
    private eventBus: IEventBus
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
    const eventData: IBookingCreatedEventData = {
      booking,
      user,
      service,
    };
    
    this.eventBus.emit(BOOKING_EVENTS.CREATED, eventData);

    return AppMapper.toBookingDTO(booking);
  }
}

