"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const models_1 = require("../database/models");
const Mappers_1 = require("./Mappers");
const BaseRepository_1 = require("./BaseRepository");
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
}
exports.BookingRepository = BookingRepository;
//# sourceMappingURL=BookingRepository.js.map