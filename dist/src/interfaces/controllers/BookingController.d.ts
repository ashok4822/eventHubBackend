import { HttpRequest, HttpResponse, HttpNext } from '../types/HttpTypes';
import { IBookService, IGetUserBookings, IGetAdminBookings } from '../../application/ports/IUseCases';
/**
 * Controller for managing service bookings.
 */
export declare class BookingController {
    private bookServiceUseCase;
    private getUserBookingsUseCase;
    private getAdminBookingsUseCase;
    constructor(bookServiceUseCase: IBookService, getUserBookingsUseCase: IGetUserBookings, getAdminBookingsUseCase: IGetAdminBookings);
    book(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    getUserBookings(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    getAllBookings(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
}
//# sourceMappingURL=BookingController.d.ts.map