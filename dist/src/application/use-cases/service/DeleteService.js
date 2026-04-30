"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteService = void 0;
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
//# sourceMappingURL=DeleteService.js.map