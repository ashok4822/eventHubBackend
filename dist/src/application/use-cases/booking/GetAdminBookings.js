"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAdminBookings = void 0;
const AppMapper_1 = require("../../mappers/AppMapper");
/**
 * Use case for retrieving all bookings across the platform.
 */
class GetAdminBookings {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute() {
        const bookings = await this._bookingRepository.findAll();
        return bookings.map(booking => AppMapper_1.AppMapper.toBookingDTO(booking));
    }
}
exports.GetAdminBookings = GetAdminBookings;
//# sourceMappingURL=GetAdminBookings.js.map