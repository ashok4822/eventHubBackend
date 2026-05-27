import { IBookingRepository } from '../../ports/BookingRepository';
import { IGetUserBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/BookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for retrieving bookings for a specific user.
 */
export class GetUserBookings implements IGetUserBookings {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(userId: string): Promise<IBookingDTO[]> {
    const bookings = await this.bookingRepository.findByUserId(userId);
    return bookings.map(booking => AppMapper.toBookingDTO(booking));
  }
}

