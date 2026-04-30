import { BookingModel } from '../database/models';
import { BookingRepository } from '../../application/ports/BookingRepository';
import { IBooking } from '../../domain/entities/Booking';
import { BookingMapper } from './Mappers';

/**
 * Mongoose implementation of the booking repository.
 */
export class MongooseBookingRepository implements BookingRepository {
  async save(bookingData: IBooking): Promise<IBooking> {
    const newBooking = new BookingModel(bookingData);
    const saved = await newBooking.save();
    return BookingMapper.toDomain(saved);
  }

  async findByUserId(userId: string): Promise<IBooking[]> {
    const bookings = await BookingModel.find({ userId }).populate('serviceId');
    return bookings.map(BookingMapper.toDomain);
  }

  async findAll(): Promise<IBooking[]> {
    const bookings = await BookingModel.find().populate('userId').populate('serviceId');
    return bookings.map(BookingMapper.toDomain);
  }

  async findById(id: string): Promise<IBooking | null> {
    const booking = await BookingModel.findById(id).populate('userId').populate('serviceId');
    return booking ? BookingMapper.toDomain(booking) : null;
  }
}
