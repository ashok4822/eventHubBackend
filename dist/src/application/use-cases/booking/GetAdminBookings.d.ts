import { IBookingRepository } from '../../ports/IBookingRepository';
import { IGetAdminBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/IBookingDTO';
/**
 * Use case for retrieving all bookings across the platform.
 */
export declare class GetAdminBookings implements IGetAdminBookings {
    private _bookingRepository;
    constructor(_bookingRepository: IBookingRepository);
    execute(): Promise<IBookingDTO[]>;
}
//# sourceMappingURL=GetAdminBookings.d.ts.map