import { IBookingRepository } from '../../ports/IBookingRepository';
import { IServiceRepository } from '../../ports/IServiceRepository';
import { IUserRepository } from '../../ports/IUserRepository';
import { IEventBus } from '../../ports/IEventBus';
import { IBookService } from '../../ports/IUseCases';
import { IBookingDTO, ICreateBookingRequestDTO } from '../../dtos/IBookingDTO';
/**
 * Use case for booking a service.
 * Refactored to follow SOLID principles:
 * - Decoupled from EmailService (SRP/OCP) via EventBus.
 * - Uses Domain Entity for business validation (Domain Richness).
 */
export declare class BookService implements IBookService {
    private _bookingRepository;
    private _serviceRepository;
    private _userRepository;
    private _eventBus;
    constructor(_bookingRepository: IBookingRepository, _serviceRepository: IServiceRepository, _userRepository: IUserRepository, _eventBus: IEventBus);
    execute({ userId, serviceId, startDate, endDate }: ICreateBookingRequestDTO): Promise<IBookingDTO>;
}
//# sourceMappingURL=BookService.d.ts.map