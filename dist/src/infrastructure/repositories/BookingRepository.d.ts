import { IBookingDocument } from '../database/models';
import { IBookingRepository } from '../../application/ports/IBookingRepository';
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
    /**
     * Returns confirmed bookings for the same service whose date range overlaps
     * with the requested [startDate, endDate].
     *
     * Overlap condition:  existingStart < requestedEnd  AND  existingEnd > requestedStart
     *
     * This is intentionally a pessimistic check — cancelled bookings are excluded
     * so they never block new reservations.
     */
    findOverlapping(serviceId: string, startDate: Date, endDate: Date): Promise<IBooking[]>;
}
//# sourceMappingURL=BookingRepository.d.ts.map