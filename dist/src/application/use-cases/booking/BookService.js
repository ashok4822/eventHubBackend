"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const Booking_1 = __importDefault(require("../../../domain/entities/Booking"));
const AppErrors_1 = require("../../errors/AppErrors");
const BookingEvents_1 = require("../../events/BookingEvents");
const AppMapper_1 = require("../../mappers/AppMapper");
/**
 * Use case for booking a service.
 * Refactored to follow SOLID principles:
 * - Decoupled from EmailService (SRP/OCP) via EventBus.
 * - Uses Domain Entity for business validation (Domain Richness).
 */
class BookService {
    constructor(_bookingRepository, _serviceRepository, _userRepository, _eventBus) {
        this._bookingRepository = _bookingRepository;
        this._serviceRepository = _serviceRepository;
        this._userRepository = _userRepository;
        this._eventBus = _eventBus;
    }
    async execute({ userId, serviceId, startDate, endDate }) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Business validation moved to Domain Entity
        try {
            Booking_1.default.validateDates(start, end);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Invalid dates';
            throw new AppErrors_1.BadRequestError(message);
        }
        const [user, service] = await Promise.all([
            this._userRepository.findById(userId),
            this._serviceRepository.findById(serviceId),
        ]);
        if (!user)
            throw new AppErrors_1.NotFoundError('User not found');
        if (!service)
            throw new AppErrors_1.NotFoundError('Service not found');
        // ── Concurrency Guard ────────────────────────────────────────────────────
        // Check for any confirmed bookings whose date range overlaps the requested
        // window BEFORE creating a new one.  Two simultaneous requests can still
        // both pass this check in theory, but the sparse index below (models.ts)
        // acts as the final atomic database-level guard.
        const overlapping = await this._bookingRepository.findOverlapping(serviceId, start, end);
        if (overlapping.length > 0) {
            throw new AppErrors_1.ConflictError('This service is already booked for the selected dates. Please choose different dates.');
        }
        // ────────────────────────────────────────────────────────────────────────
        // Price calculation in Domain Entity
        const totalPrice = Booking_1.default.calculateTotalPrice(start, end, service.pricePerDay);
        const booking = await this._bookingRepository.save({
            userId,
            serviceId,
            startDate: start,
            endDate: end,
            totalPrice,
        });
        // Emit event for side effects (e.g., email notification)
        const eventData = {
            booking,
            user,
            service,
        };
        this._eventBus.emit(BookingEvents_1.BOOKING_EVENTS.CREATED, eventData);
        return AppMapper_1.AppMapper.toBookingDTO(booking);
    }
}
exports.BookService = BookService;
//# sourceMappingURL=BookService.js.map