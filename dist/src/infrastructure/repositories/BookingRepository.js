"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const models_1 = require("../database/models");
const Mappers_1 = require("./Mappers");
const BaseRepository_1 = require("./BaseRepository");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Implementation of the booking repository.
 */
class BookingRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.BookingModel, Mappers_1.BookingMapper);
    }
    async findByUserId(userId) {
        const bookings = await models_1.BookingModel.find({ userId }).populate('serviceId');
        return bookings.map(Mappers_1.BookingMapper.toDomain);
    }
    async findAll() {
        const bookings = await models_1.BookingModel.find().populate('userId').populate('serviceId');
        return bookings.map(Mappers_1.BookingMapper.toDomain);
    }
    async findById(id) {
        const booking = await models_1.BookingModel.findById(id).populate('userId').populate('serviceId');
        return booking ? Mappers_1.BookingMapper.toDomain(booking) : null;
    }
    /**
     * Returns confirmed bookings for the same service whose date range overlaps
     * with the requested [startDate, endDate].
     *
     * Overlap condition:  existingStart < requestedEnd  AND  existingEnd > requestedStart
     *
     * This is intentionally a pessimistic check — cancelled bookings are excluded
     * so they never block new reservations.
     */
    async findOverlapping(serviceId, startDate, endDate) {
        const bookings = await models_1.BookingModel.find({
            serviceId: new mongoose_1.default.Types.ObjectId(serviceId),
            status: 'confirmed',
            startDate: { $lt: endDate },
            endDate: { $gt: startDate },
        });
        return bookings.map(Mappers_1.BookingMapper.toDomain);
    }
}
exports.BookingRepository = BookingRepository;
//# sourceMappingURL=BookingRepository.js.map