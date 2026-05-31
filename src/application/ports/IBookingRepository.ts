import { IBooking } from '../../domain/entities/Booking';
import { IBaseRepository } from './IBaseRepository';

export interface IBookingRepository extends IBaseRepository<IBooking> {
  findByUserId(userId: string): Promise<IBooking[]>;
  findAll(): Promise<IBooking[]>;
  /**
   * Returns any confirmed bookings for the given service whose date range
   * overlaps with [startDate, endDate].  Used to prevent double-bookings.
   */
  findOverlapping(serviceId: string, startDate: Date, endDate: Date): Promise<IBooking[]>;
}
