import { IBookingRepository } from '../../ports/BookingRepository';
import { IGetUserBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/BookingDTO';
/**
 * Use case for retrieving bookings for a specific user.
 */
export declare class GetUserBookings implements IGetUserBookings {
    private bookingRepository;
    constructor(bookingRepository: IBookingRepository);
    execute(userId: string): Promise<IBookingDTO[]>;
}
//# sourceMappingURL=GetUserBookings.d.ts.map