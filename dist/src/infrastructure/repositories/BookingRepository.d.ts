import { IBookingDocument } from '../database/models';
import { IBookingRepository } from '../../application/ports/BookingRepository';
import { IBooking } from '../../domain/entities/Booking';
import { BaseRepository } from './BaseRepository';
/**
 * Implementation of the booking repository.
 */
export declare class BookingRepository extends BaseRepository<IBooking, IBookingDocument> implements IBookingRepository {
    constructor();
    findByUserId(userId: string): Promise<IBooking[]>;
    findAll(): Promise<IBooking[]>;
    findById(id: string): Promise<IBooking | null>;
}
//# sourceMappingURL=BookingRepository.d.ts.map