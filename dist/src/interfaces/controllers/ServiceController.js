"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const AppErrors_1 = require("../../application/errors/AppErrors");
const statusCodes_1 = require("../constants/statusCodes");
const messages_1 = require("../constants/messages");
/**
 * Controller for managing services.
 */
class ServiceController {
    constructor(addServiceUseCase, editServiceUseCase, deleteServiceUseCase, getAllServicesUseCase) {
        this.addServiceUseCase = addServiceUseCase;
        this.editServiceUseCase = editServiceUseCase;
        this.deleteServiceUseCase = deleteServiceUseCase;
        this.getAllServicesUseCase = getAllServicesUseCase;
    }
    async addService(req, res, _next) {
        const { title, description, pricePerDay, location, contactDetails, category, availabilityDates } = req.body;
        const service = await this.addServiceUseCase.execute({
            title, description, pricePerDay, location, contactDetails, category, availabilityDates
        });
        res.status(statusCodes_1.STATUS_CODES.CREATED).json({
            success: true,
            data: service
        });
    }
    async editService(req, res, _next) {
        const { id } = req.params;
        const { title, description, pricePerDay, location, contactDetails, category, availabilityDates } = req.body;
        const service = await this.editServiceUseCase.execute(id, {
            title, description, pricePerDay, location, contactDetails, category, availabilityDates
        });
        res.json({
            success: true,
            data: service
        });
    }
    async deleteService(req, res, _next) {
        const success = await this.deleteServiceUseCase.execute(req.params.id);
        if (success) {
            res.json({
                success: true,
                message: messages_1.MESSAGES.SERVICE.DELETED
            });
        }
        else {
            throw new AppErrors_1.BadRequestError('Service not found or could not be deleted');
        }
    }
    async getAllServices(req, res, _next) {
        const services = await this.getAllServicesUseCase.execute(req.query);
        res.json({
            success: true,
            data: services
        });
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=ServiceController.js.map