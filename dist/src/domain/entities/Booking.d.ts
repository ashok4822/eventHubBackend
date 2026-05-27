import { IUser } from './User';
import { IService } from './Service';
export type BookingStatus = 'confirmed' | 'cancelled';
export interface IBooking {
    id?: string;
    userId: string | IUser;
    serviceId: string | IService;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status?: BookingStatus;
}
declare class Booking implements IBooking {
    id?: string;
    userId: string | IUser;
    serviceId: string | IService;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: BookingStatus;
    constructor(data: IBooking);
    /**
     * Validates the booking dates.
     * Business rule: Start date cannot be in the past, and end date must be after start date.
     */
    static validateDates(startDate: Date, endDate: Date): void;
    static calculateTotalPrice(startDate: Date, endDate: Date, pricePerDay: number): number;
}
export default Booking;
//# sourceMappingURL=Booking.d.ts.map