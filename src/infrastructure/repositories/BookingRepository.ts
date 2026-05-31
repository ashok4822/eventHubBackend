import { BookingModel, IBookingDocument } from '../database/models';
import { IBookingRepository } from '../../application/ports/IBookingRepository';
import { IBooking } from '../../domain/entities/Booking';
import { BookingMapper } from './Mappers';
import { BaseRepository } from './BaseRepository';
import mongoose from 'mongoose';

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

  /**
   * Returns confirmed bookings for the same service whose date range overlaps
   * with the requested [startDate, endDate].
   *
   * Overlap condition:  existingStart < requestedEnd  AND  existingEnd > requestedStart
   *
   * This is intentionally a pessimistic check — cancelled bookings are excluded
   * so they never block new reservations.
   */
  async findOverlapping(serviceId: string, startDate: Date, endDate: Date): Promise<IBooking[]> {
    const bookings = await BookingModel.find({
      serviceId: new mongoose.Types.ObjectId(serviceId),
      status: 'confirmed',
      startDate: { $lt: endDate },
      endDate:   { $gt: startDate },
    });
    return bookings.map(BookingMapper.toDomain);
  }
}

