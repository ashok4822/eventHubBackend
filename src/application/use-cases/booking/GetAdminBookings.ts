import { IBookingRepository } from '../../ports/BookingRepository';
import { IGetAdminBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/BookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for retrieving all bookings across the platform.
 */
export class GetAdminBookings implements IGetAdminBookings {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(): Promise<IBookingDTO[]> {
    const bookings = await this.bookingRepository.findAll();
    return bookings.map(booking => AppMapper.toBookingDTO(booking));
  }
}

