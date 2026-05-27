import { IBooking } from '../../domain/entities/Booking';
import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
export declare const BOOKING_EVENTS: {
    CREATED: string;
};
export interface IBookingCreatedEventData {
    booking: IBooking;
    user: IUser;
    service: IService;
}
//# sourceMappingURL=BookingEvents.d.ts.map