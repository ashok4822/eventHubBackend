import { IBookingRepository } from '../../ports/BookingRepository';
import { IGetAdminBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/BookingDTO';
/**
 * Use case for retrieving all bookings across the platform.
 */
export declare class GetAdminBookings implements IGetAdminBookings {
    private bookingRepository;
    constructor(bookingRepository: IBookingRepository);
    execute(): Promise<IBookingDTO[]>;
}
//# sourceMappingURL=GetAdminBookings.d.ts.map