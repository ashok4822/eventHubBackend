import { IHttpRequest, IHttpResponse, HttpNext } from '../types/IHttpTypes';
import { STATUS_CODES } from '../constants/statusCodes';
import { IBookService, IGetUserBookings, IGetAdminBookings } from '../../application/ports/IUseCases';

/**
 * Controller for managing service bookings.
 */
export class BookingController {
  constructor(
    private _bookServiceUseCase: IBookService,
    private _getUserBookingsUseCase: IGetUserBookings,
    private _getAdminBookingsUseCase: IGetAdminBookings
  ) {}

  async book(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void> {
    const { serviceId, startDate, endDate } = req.body;
    const userId = req.user!.id;

    const booking = await this._bookServiceUseCase.execute({
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

  async getUserBookings(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void> {
    const bookings = await this._getUserBookingsUseCase.execute(req.user!.id);
    res.json({
      success: true,
      data: bookings
    });
  }

  async getAllBookings(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void> {
    const bookings = await this._getAdminBookingsUseCase.execute();
    res.json({
      success: true,
      data: bookings
    });
  }
}

