import { BookingRepository } from '../../ports/BookingRepository';
import { ServiceRepository } from '../../ports/ServiceRepository';
import { UserRepository } from '../../ports/UserRepository';
import { EventBus } from '../../ports/EventBus';
import { IBookService } from '../../ports/IUseCases';
import { BookingDTO, CreateBookingRequestDTO } from '../../dtos/BookingDTO';
/**
 * Use case for booking a service.
 * Refactored to follow SOLID principles:
 * - Decoupled from EmailService (SRP/OCP) via EventBus.
 * - Uses Domain Entity for business validation (Domain Richness).
 */
export declare class BookService implements IBookService {
    private bookingRepository;
    private serviceRepository;
    private userRepository;
    private eventBus;
    constructor(bookingRepository: BookingRepository, serviceRepository: ServiceRepository, userRepository: UserRepository, eventBus: EventBus);
    execute({ userId, serviceId, startDate, endDate }: CreateBookingRequestDTO): Promise<BookingDTO>;
}
//# sourceMappingURL=BookService.d.ts.map