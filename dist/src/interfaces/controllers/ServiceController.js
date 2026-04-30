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
    async addService(req, res, next) {
        try {
            const { title, description, pricePerDay, location, contactDetails, category, availabilityDates } = req.body;
            const service = await this.addServiceUseCase.execute({
                title, description, pricePerDay, location, contactDetails, category, availabilityDates
            });
            res.status(statusCodes_1.STATUS_CODES.CREATED).json({
                success: true,
                data: service
            });
        }
        catch (error) {
            next(error);
        }
    }
    async editService(req, res, next) {
        try {
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
        catch (error) {
            next(error);
        }
    }
    async deleteService(req, res, next) {
        try {
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
        catch (error) {
            next(error);
        }
    }
    async getAllServices(req, res, next) {
        try {
            const services = await this.getAllServicesUseCase.execute(req.query);
            res.json({
                success: true,
                data: services
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=ServiceController.js.map