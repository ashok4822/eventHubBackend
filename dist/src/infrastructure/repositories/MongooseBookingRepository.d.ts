import { BookingRepository } from '../../application/ports/BookingRepository';
import { IBooking } from '../../domain/entities/Booking';
/**
 * Mongoose implementation of the booking repository.
 */
export declare class MongooseBookingRepository implements BookingRepository {
    save(bookingData: IBooking): Promise<IBooking>;
    findByUserId(userId: string): Promise<IBooking[]>;
    findAll(): Promise<IBooking[]>;
    findById(id: string): Promise<IBooking | null>;
}
//# sourceMappingURL=MongooseBookingRepository.d.ts.map