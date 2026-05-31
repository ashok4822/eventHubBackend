import { IBookingRepository } from '../../ports/IBookingRepository';
import { IGetUserBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/IBookingDTO';
/**
 * Use case for retrieving bookings for a specific user.
 */
export declare class GetUserBookings implements IGetUserBookings {
    private _bookingRepository;
    constructor(_bookingRepository: IBookingRepository);
    execute(userId: string): Promise<IBookingDTO[]>;
}
//# sourceMappingURL=GetUserBookings.d.ts.map