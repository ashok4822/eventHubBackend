import { IBookingRepository } from '../../ports/IBookingRepository';
import { IGetUserBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/IBookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for retrieving bookings for a specific user.
 */
export class GetUserBookings implements IGetUserBookings {
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(userId: string): Promise<IBookingDTO[]> {
    const bookings = await this._bookingRepository.findByUserId(userId);
    return bookings.map(booking => AppMapper.toBookingDTO(booking));
  }
}

