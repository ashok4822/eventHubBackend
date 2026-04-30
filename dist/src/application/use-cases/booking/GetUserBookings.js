"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserBookings = void 0;
const AppMapper_1 = require("../../mappers/AppMapper");
/**
 * Use case for retrieving bookings for a specific user.
 */
class GetUserBookings {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async execute(userId) {
        const bookings = await this.bookingRepository.findByUserId(userId);
        return bookings.map(booking => AppMapper_1.AppMapper.toBookingDTO(booking));
    }
}
exports.GetUserBookings = GetUserBookings;
//# sourceMappingURL=GetUserBookings.js.map