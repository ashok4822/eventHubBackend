"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditService = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
const AppMapper_1 = require("../../mappers/AppMapper");
/**
 * Use case for editing an existing service.
 */
class EditService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async execute(id, serviceData) {
        if (serviceData.pricePerDay !== undefined && serviceData.pricePerDay <= 0) {
            throw new AppErrors_1.BadRequestError('Price per day must be a positive number');
        }
        const service = await this.serviceRepository.update(id, serviceData);
        return service ? AppMapper_1.AppMapper.toServiceDTO(service) : null;
    }
}
exports.EditService = EditService;
//# sourceMappingURL=EditService.js.map