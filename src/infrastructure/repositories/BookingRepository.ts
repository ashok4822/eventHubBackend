import { BookingModel, IBookingDocument } from '../database/models';
import { IBookingRepository } from '../../application/ports/BookingRepository';
import { IBooking } from '../../domain/entities/Booking';
import { BookingMapper } from './Mappers';
import { BaseRepository } from './BaseRepository';

/**
 * Implementation of the booking repository.
 */
export class BookingRepository extends BaseRepository<IBooking, IBookingDocument> implements IBookingRepository {
  constructor() {
    super(BookingModel, BookingMapper);
  }

  async findByUserId(userId: string): Promise<IBooking[]> {
    const bookings = await BookingModel.find({ userId }).populate('serviceId');
    return bookings.map(BookingMapper.toDomain);
  }

  async findAll(): Promise<IBooking[]> {
    const bookings = await BookingModel.find().populate('userId').populate('serviceId');
    return bookings.map(BookingMapper.toDomain);
  }

  override async findById(id: string): Promise<IBooking | null> {
    const booking = await BookingModel.findById(id).populate('userId').populate('serviceId');
    return booking ? BookingMapper.toDomain(booking) : null;
  }
}
