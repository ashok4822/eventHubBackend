import { IHttpRequest, IHttpResponse, HttpNext } from '../types/HttpTypes';
import { IBookService, IGetUserBookings, IGetAdminBookings } from '../../application/ports/IUseCases';
/**
 * Controller for managing service bookings.
 */
export declare class BookingController {
    private bookServiceUseCase;
    private getUserBookingsUseCase;
    private getAdminBookingsUseCase;
    constructor(bookServiceUseCase: IBookService, getUserBookingsUseCase: IGetUserBookings, getAdminBookingsUseCase: IGetAdminBookings);
    book(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    getUserBookings(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    getAllBookings(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
}
//# sourceMappingURL=BookingController.d.ts.map