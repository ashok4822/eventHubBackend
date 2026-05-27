"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const statusCodes_1 = require("../constants/statusCodes");
/**
 * Controller for managing service bookings.
 */
class BookingController {
    constructor(bookServiceUseCase, getUserBookingsUseCase, getAdminBookingsUseCase) {
        this.bookServiceUseCase = bookServiceUseCase;
        this.getUserBookingsUseCase = getUserBookingsUseCase;
        this.getAdminBookingsUseCase = getAdminBookingsUseCase;
    }
    async book(req, res, _next) {
        const { serviceId, startDate, endDate } = req.body;
        const userId = req.user.id;
        const booking = await this.bookServiceUseCase.execute({
            userId,
            serviceId,
            startDate,
            endDate,
        });
        res.status(statusCodes_1.STATUS_CODES.CREATED).json({
            success: true,
            data: booking
        });
    }
    async getUserBookings(req, res, _next) {
        const bookings = await this.getUserBookingsUseCase.execute(req.user.id);
        res.json({
            success: true,
            data: bookings
        });
    }
    async getAllBookings(req, res, _next) {
        const bookings = await this.getAdminBookingsUseCase.execute();
        res.json({
            success: true,
            data: bookings
        });
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=BookingController.js.map