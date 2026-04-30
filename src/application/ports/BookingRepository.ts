import { IBooking } from '../../domain/entities/Booking';

export interface BookingRepository {
  save(booking: IBooking): Promise<IBooking>;
  findByUserId(userId: string): Promise<IBooking[]>;
  findAll(): Promise<IBooking[]>;
  findById(id: string): Promise<IBooking | null>;
}
