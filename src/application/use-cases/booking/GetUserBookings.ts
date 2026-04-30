import { BookingRepository } from '../../ports/BookingRepository';
import { IGetUserBookings } from '../../ports/IUseCases';
import { BookingDTO } from '../../dtos/BookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for retrieving bookings for a specific user.
 */
export class GetUserBookings implements IGetUserBookings {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(userId: string): Promise<BookingDTO[]> {
    const bookings = await this.bookingRepository.findByUserId(userId);
    return bookings.map(booking => AppMapper.toBookingDTO(booking));
  }
}

