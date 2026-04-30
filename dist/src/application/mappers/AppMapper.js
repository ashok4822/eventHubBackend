"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMapper = void 0;
class AppMapper {
    static toUserDTO(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
    static toServiceDTO(service) {
        return {
            id: service.id,
            title: service.title,
            category: service.category,
            pricePerDay: service.pricePerDay,
            description: service.description,
            availabilityDates: service.availabilityDates,
            contactDetails: service.contactDetails,
            location: service.location,
        };
    }
    static toBookingDTO(booking) {
        return {
            id: booking.id,
            userId: booking.userId,
            serviceId: booking.serviceId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalPrice: booking.totalPrice,
            status: booking.status,
        };
    }
}
exports.AppMapper = AppMapper;
//# sourceMappingURL=AppMapper.js.map