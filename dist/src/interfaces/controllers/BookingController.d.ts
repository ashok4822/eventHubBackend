import { IHttpRequest, IHttpResponse, HttpNext } from '../types/IHttpTypes';
import { IBookService, IGetUserBookings, IGetAdminBookings } from '../../application/ports/IUseCases';
/**
 * Controller for managing service bookings.
 */
export declare class BookingController {
    private _bookServiceUseCase;
    private _getUserBookingsUseCase;
    private _getAdminBookingsUseCase;
    constructor(_bookServiceUseCase: IBookService, _getUserBookingsUseCase: IGetUserBookings, _getAdminBookingsUseCase: IGetAdminBookings);
    book(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    getUserBookings(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    getAllBookings(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
}
//# sourceMappingURL=BookingController.d.ts.map