"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingMapper = exports.ServiceMapper = exports.UserMapper = void 0;
class UserMapper {
    static toDomain(raw) {
        return {
            id: raw._id.toString(),
            name: raw.name,
            email: raw.email,
            password: raw.password,
            role: raw.role,
        };
    }
}
exports.UserMapper = UserMapper;
class ServiceMapper {
    static toDomain(raw) {
        return {
            id: raw._id.toString(),
            title: raw.title,
            category: raw.category,
            pricePerDay: raw.pricePerDay,
            description: raw.description,
            availabilityDates: raw.availabilityDates,
            contactDetails: raw.contactDetails,
            location: raw.location,
        };
    }
}
exports.ServiceMapper = ServiceMapper;
class BookingMapper {
    static toDomain(raw) {
        const userId = (raw.userId && typeof raw.userId === 'object' && raw.userId._id)
            ? raw.userId._id.toString()
            : raw.userId?.toString();
        const serviceId = (raw.serviceId && typeof raw.serviceId === 'object' && raw.serviceId._id)
            ? raw.serviceId._id.toString()
            : raw.serviceId?.toString();
        return {
            id: raw._id.toString(),
            userId,
            serviceId,
            startDate: new Date(raw.startDate),
            endDate: new Date(raw.endDate),
            totalPrice: raw.totalPrice,
            status: raw.status,
        };
    }
}
exports.BookingMapper = BookingMapper;
//# sourceMappingURL=Mappers.js.map