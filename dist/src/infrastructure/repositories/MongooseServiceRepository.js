"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseServiceRepository = void 0;
const models_1 = require("../database/models");
const Mappers_1 = require("./Mappers");
/**
 * Mongoose implementation of the service repository.
 */
class MongooseServiceRepository {
    async save(serviceData) {
        const newService = new models_1.ServiceModel(serviceData);
        const saved = await newService.save();
        return Mappers_1.ServiceMapper.toDomain(saved);
    }
    async findById(id) {
        const service = await models_1.ServiceModel.findById(id);
        return service ? Mappers_1.ServiceMapper.toDomain(service) : null;
    }
    async findAll(filters, options) {
        const query = {};
        if (filters.category)
            query.category = filters.category;
        if (filters.location)
            query.location = { $regex: filters.location, $options: 'i' };
        if (filters.minPrice || filters.maxPrice) {
            query.pricePerDay = {};
            if (filters.minPrice)
                query.pricePerDay.$gte = Number(filters.minPrice);
            if (filters.maxPrice)
                query.pricePerDay.$lte = Number(filters.maxPrice);
        }
        const page = Number(options.page) || 1;
        const limit = Number(options.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = options.sortBy || 'createdAt';
        const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
        const sort = { [sortBy]: sortOrder };
        const [services, totalCount] = await Promise.all([
            models_1.ServiceModel.find(query).sort(sort).skip(skip).limit(limit),
            models_1.ServiceModel.countDocuments(query),
        ]);
        return {
            services: services.map(Mappers_1.ServiceMapper.toDomain),
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        };
    }
    async update(id, serviceData) {
        const updated = await models_1.ServiceModel.findByIdAndUpdate(id, serviceData, { new: true });
        return updated ? Mappers_1.ServiceMapper.toDomain(updated) : null;
    }
    async delete(id) {
        const result = await models_1.ServiceModel.findByIdAndDelete(id);
        return !!result;
    }
}
exports.MongooseServiceRepository = MongooseServiceRepository;
//# sourceMappingURL=MongooseServiceRepository.js.map