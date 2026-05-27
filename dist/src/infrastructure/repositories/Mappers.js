"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingMapper = exports.ServiceMapper = exports.UserMapper = void 0;
class UserMapper {
    static toDomain(doc) {
        return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password || '',
            role: doc.role,
            resetPasswordToken: doc.resetPasswordToken,
            resetPasswordExpires: doc.resetPasswordExpires,
        };
    }
}
exports.UserMapper = UserMapper;
class ServiceMapper {
    static toDomain(doc) {
        return {
            id: doc._id.toString(),
            title: doc.title,
            category: doc.category,
            pricePerDay: doc.pricePerDay,
            description: doc.description,
            availabilityDates: doc.availabilityDates,
            contactDetails: doc.contactDetails,
            location: doc.location,
        };
    }
}
exports.ServiceMapper = ServiceMapper;
class BookingMapper {
    static toDomain(doc) {
        const userDoc = doc.userId;
        const userId = (userDoc && typeof userDoc === 'object' && '_id' in userDoc)
            ? UserMapper.toDomain(userDoc)
            : doc.userId.toString();
        const serviceDoc = doc.serviceId;
        const serviceId = (serviceDoc && typeof serviceDoc === 'object' && '_id' in serviceDoc)
            ? ServiceMapper.toDomain(serviceDoc)
            : doc.serviceId.toString();
        return {
            id: doc._id.toString(),
            userId: userId,
            serviceId: serviceId,
            startDate: new Date(doc.startDate),
            endDate: new Date(doc.endDate),
            totalPrice: doc.totalPrice,
            status: doc.status,
        };
    }
}
exports.BookingMapper = BookingMapper;
//# sourceMappingURL=Mappers.js.map