import { IBookingRepository } from '../../ports/BookingRepository';
import { IServiceRepository } from '../../ports/ServiceRepository';
import { IUserRepository } from '../../ports/UserRepository';
import { IEventBus } from '../../ports/EventBus';
import { IBookService } from '../../ports/IUseCases';
import { IBookingDTO, ICreateBookingRequestDTO } from '../../dtos/BookingDTO';
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
    constructor(bookingRepository: IBookingRepository, serviceRepository: IServiceRepository, userRepository: IUserRepository, eventBus: IEventBus);
    execute({ userId, serviceId, startDate, endDate }: ICreateBookingRequestDTO): Promise<IBookingDTO>;
}
//# sourceMappingURL=BookService.d.ts.map