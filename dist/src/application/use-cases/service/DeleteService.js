"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteService = void 0;
/**
 * Use case for deleting a service.
 */
class DeleteService {
    constructor(_serviceRepository) {
        this._serviceRepository = _serviceRepository;
    }
    async execute(id) {
        return await this._serviceRepository.delete(id);
    }
}
exports.DeleteService = DeleteService;
//# sourceMappingURL=DeleteService.js.map