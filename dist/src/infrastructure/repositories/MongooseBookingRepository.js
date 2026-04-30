"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseBookingRepository = void 0;
const models_1 = require("../database/models");
const Mappers_1 = require("./Mappers");
/**
 * Mongoose implementation of the booking repository.
 */
class MongooseBookingRepository {
    async save(bookingData) {
        const newBooking = new models_1.BookingModel(bookingData);
        const saved = await newBooking.save();
        return Mappers_1.BookingMapper.toDomain(saved);
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
exports.MongooseBookingRepository = MongooseBookingRepository;
//# sourceMappingURL=MongooseBookingRepository.js.map