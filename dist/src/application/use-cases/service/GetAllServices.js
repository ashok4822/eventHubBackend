"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllServices = void 0;
const AppMapper_1 = require("../../mappers/AppMapper");
/**
 * Use case for retrieving all services.
 */
class GetAllServices {
    constructor(_serviceRepository) {
        this._serviceRepository = _serviceRepository;
    }
    async execute(query) {
        const { page, limit, sortBy, sortOrder, ...filters } = query;
        const options = {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            sortBy,
            sortOrder: sortOrder
        };
        const result = await this._serviceRepository.findAll(filters, options);
        return {
            ...result,
            services: result.services.map(service => AppMapper_1.AppMapper.toServiceDTO(service))
        };
    }
}
exports.GetAllServices = GetAllServices;
//# sourceMappingURL=GetAllServices.js.map