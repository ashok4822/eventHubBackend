import { BookingRepository } from '../../ports/BookingRepository';
import { IGetAdminBookings } from '../../ports/IUseCases';
import { BookingDTO } from '../../dtos/BookingDTO';
/**
 * Use case for retrieving all bookings across the platform.
 */
export declare class GetAdminBookings implements IGetAdminBookings {
    private bookingRepository;
    constructor(bookingRepository: BookingRepository);
    execute(): Promise<BookingDTO[]>;
}
//# sourceMappingURL=GetAdminBookings.d.ts.map