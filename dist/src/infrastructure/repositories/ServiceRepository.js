"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const models_1 = require("../database/models");
const Mappers_1 = require("./Mappers");
const BaseRepository_1 = require("./BaseRepository");
/**
 * Implementation of the service repository.
 */
class ServiceRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.ServiceModel, Mappers_1.ServiceMapper);
    }
    async findAll(filters, options) {
        const query = {};
        if (filters.category)
            query.category = filters.category;
        if (filters.location)
            query.location = { $regex: filters.location, $options: 'i' };
        if (filters.minPrice || filters.maxPrice) {
            const priceQuery = {};
            if (filters.minPrice)
                priceQuery.$gte = Number(filters.minPrice);
            if (filters.maxPrice)
                priceQuery.$lte = Number(filters.maxPrice);
            query.pricePerDay = priceQuery;
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
}
exports.ServiceRepository = ServiceRepository;
//# sourceMappingURL=ServiceRepository.js.map