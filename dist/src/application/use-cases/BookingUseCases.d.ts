import { BookingRepository } from '../ports/BookingRepository';
import { ServiceRepository } from '../ports/ServiceRepository';
import { UserRepository } from '../ports/UserRepository';
import { EmailService } from '../ports/EmailService';
import { Logger } from '../ports/Logger';
import { IBooking } from '../../domain/entities/Booking';
interface BookingData {
    userId: string;
    serviceId: string;
    startDate: string;
    endDate: string;
}
/**
 * Use case for booking a service.
 */
export declare class BookService {
    private bookingRepository;
    private serviceRepository;
    private userRepository;
    private emailService;
    private logger;
    constructor(bookingRepository: BookingRepository, serviceRepository: ServiceRepository, userRepository: UserRepository, emailService: EmailService, logger: Logger);
    execute({ userId, serviceId, startDate, endDate }: BookingData): Promise<IBooking>;
}
/**
 * Use case for retrieving bookings for a specific user.
 */
export declare class GetUserBookings {
    private bookingRepository;
    constructor(bookingRepository: BookingRepository);
    execute(userId: string): Promise<IBooking[]>;
}
/**
 * Use case for retrieving all bookings across the platform.
 */
export declare class GetAdminBookings {
    private bookingRepository;
    constructor(bookingRepository: BookingRepository);
    execute(): Promise<IBooking[]>;
}
export {};
//# sourceMappingURL=BookingUseCases.d.ts.map