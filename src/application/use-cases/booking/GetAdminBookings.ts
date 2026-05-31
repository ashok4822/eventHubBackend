import { IBookingRepository } from '../../ports/IBookingRepository';
import { IGetAdminBookings } from '../../ports/IUseCases';
import { IBookingDTO } from '../../dtos/IBookingDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for retrieving all bookings across the platform.
 */
export class GetAdminBookings implements IGetAdminBookings {
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(): Promise<IBookingDTO[]> {
    const bookings = await this._bookingRepository.findAll();
    return bookings.map(booking => AppMapper.toBookingDTO(booking));
  }
}

