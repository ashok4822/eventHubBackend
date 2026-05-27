import { IBooking } from '../../domain/entities/Booking';
import { IBaseRepository } from './BaseRepository';
export interface IBookingRepository extends IBaseRepository<IBooking> {
    findByUserId(userId: string): Promise<IBooking[]>;
    findAll(): Promise<IBooking[]>;
}
//# sourceMappingURL=BookingRepository.d.ts.map