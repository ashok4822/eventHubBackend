"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddService = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
const AppMapper_1 = require("../../mappers/AppMapper");
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
        const service = await this.serviceRepository.save(serviceData);
        return AppMapper_1.AppMapper.toServiceDTO(service);
    }
}
exports.AddService = AddService;
//# sourceMappingURL=AddService.js.map