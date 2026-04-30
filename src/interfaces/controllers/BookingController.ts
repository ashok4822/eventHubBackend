import { HttpRequest, HttpResponse, HttpNext } from '../types/HttpTypes';
import { STATUS_CODES } from '../constants/statusCodes';
import { IBookService, IGetUserBookings, IGetAdminBookings } from '../../application/ports/IUseCases';

/**
 * Controller for managing service bookings.
 */
export class BookingController {
  constructor(
    private bookServiceUseCase: IBookService,
    private getUserBookingsUseCase: IGetUserBookings,
    private getAdminBookingsUseCase: IGetAdminBookings
  ) {}

  async book(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const { serviceId, startDate, endDate } = req.body;
    const userId = req.user!.id;

    const booking = await this.bookServiceUseCase.execute({
      userId,
      serviceId,
      startDate,
      endDate,
    });
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      data: booking
    });
  }

  async getUserBookings(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const bookings = await this.getUserBookingsUseCase.execute(req.user!.id);
    res.json({
      success: true,
      data: bookings
    });
  }

  async getAllBookings(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const bookings = await this.getAdminBookingsUseCase.execute();
    res.json({
      success: true,
      data: bookings
    });
  }
}

