"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAdminBookings = exports.GetUserBookings = exports.BookService = void 0;
const AppErrors_1 = require("../errors/AppErrors");
/**
 * Use case for booking a service.
 */
class BookService {
    constructor(bookingRepository, serviceRepository, userRepository, emailService, logger) {
        this.bookingRepository = bookingRepository;
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.logger = logger;
    }
    async execute({ userId, serviceId, startDate, endDate }) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (start < today) {
            throw new AppErrors_1.BadRequestError('Start date cannot be in the past');
        }
        if (end < start) {
            throw new AppErrors_1.BadRequestError('End date must be after start date');
        }
        const [user, service] = await Promise.all([
            this.userRepository.findById(userId),
            this.serviceRepository.findById(serviceId),
        ]);
        if (!user)
            throw new AppErrors_1.NotFoundError('User not found');
        if (!service)
            throw new AppErrors_1.NotFoundError('Service not found');
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const diffDays = Math.round(Math.abs(end.getTime() - start.getTime()) / MS_PER_DAY) + 1;
        const totalPrice = service.pricePerDay * diffDays;
        const booking = await this.bookingRepository.save({
            userId,
            serviceId,
            startDate,
            endDate,
            totalPrice,
        });
        // Send confirmation email asynchronously
        this.emailService.sendBookingConfirmation(user, service, booking).catch((err) => {
            this.logger.error('Failed to send confirmation email async', err);
        });
        return booking;
    }
}
exports.BookService = BookService;
/**
 * Use case for retrieving bookings for a specific user.
 */
class GetUserBookings {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async execute(userId) {
        return await this.bookingRepository.findByUserId(userId);
    }
}
exports.GetUserBookings = GetUserBookings;
/**
 * Use case for retrieving all bookings across the platform.
 */
class GetAdminBookings {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async execute() {
        return await this.bookingRepository.findAll();
    }
}
exports.GetAdminBookings = GetAdminBookings;
//# sourceMappingURL=BookingUseCases.js.map