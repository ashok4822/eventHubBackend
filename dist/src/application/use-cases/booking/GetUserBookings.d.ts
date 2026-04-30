import { BookingRepository } from '../../ports/BookingRepository';
import { IGetUserBookings } from '../../ports/IUseCases';
import { BookingDTO } from '../../dtos/BookingDTO';
/**
 * Use case for retrieving bookings for a specific user.
 */
export declare class GetUserBookings implements IGetUserBookings {
    private bookingRepository;
    constructor(bookingRepository: BookingRepository);
    execute(userId: string): Promise<BookingDTO[]>;
}
//# sourceMappingURL=GetUserBookings.d.ts.map