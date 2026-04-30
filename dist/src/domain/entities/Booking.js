"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Booking {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.serviceId = data.serviceId;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.totalPrice = data.totalPrice;
        this.status = data.status || 'confirmed';
    }
    /**
     * Validates the booking dates.
     * Business rule: Start date cannot be in the past, and end date must be after start date.
     */
    static validateDates(startDate, endDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (startDate < today) {
            throw new Error('Start date cannot be in the past');
        }
        if (endDate < startDate) {
            throw new Error('End date must be after start date');
        }
    }
    static calculateTotalPrice(startDate, endDate, pricePerDay) {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const diffDays = Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / MS_PER_DAY) + 1;
        return pricePerDay * diffDays;
    }
}
exports.default = Booking;
//# sourceMappingURL=Booking.js.map