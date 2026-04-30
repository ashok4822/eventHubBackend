"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllServices = exports.DeleteService = exports.EditService = exports.AddService = void 0;
const AppErrors_1 = require("../errors/AppErrors");
/**
 * Use case for adding a new service.
 */
class AddService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async execute(serviceData) {
        if (serviceData.pricePerDay <= 0) {
            throw new AppErrors_1.BadRequestError('Price per day must be a positive number');
        }
        return await this.serviceRepository.save(serviceData);
    }
}
exports.AddService = AddService;
/**
 * Use case for editing an existing service.
 */
class EditService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async execute(id, serviceData) {
        if (serviceData.pricePerDay <= 0) {
            throw new AppErrors_1.BadRequestError('Price per day must be a positive number');
        }
        return await this.serviceRepository.update(id, serviceData);
    }
}
exports.EditService = EditService;
/**
 * Use case for deleting a service.
 */
class DeleteService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async execute(id) {
        return await this.serviceRepository.delete(id);
    }
}
exports.DeleteService = DeleteService;
/**
 * Use case for retrieving all services.
 */
class GetAllServices {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async execute(query) {
        const { page, limit, sortBy, sortOrder, ...filters } = query;
        const options = {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            sortBy,
            sortOrder: sortOrder
        };
        return await this.serviceRepository.findAll(filters, options);
    }
}
exports.GetAllServices = GetAllServices;
//# sourceMappingURL=ServiceUseCases.js.map