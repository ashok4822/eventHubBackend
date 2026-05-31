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
    constructor(_addServiceUseCase, _editServiceUseCase, _deleteServiceUseCase, _getAllServicesUseCase) {
        this._addServiceUseCase = _addServiceUseCase;
        this._editServiceUseCase = _editServiceUseCase;
        this._deleteServiceUseCase = _deleteServiceUseCase;
        this._getAllServicesUseCase = _getAllServicesUseCase;
    }
    async addService(req, res, _next) {
        const { title, description, pricePerDay, location, contactDetails, category, availabilityDates } = req.body;
        const service = await this._addServiceUseCase.execute({
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
        const service = await this._editServiceUseCase.execute(id, {
            title, description, pricePerDay, location, contactDetails, category, availabilityDates
        });
        res.json({
            success: true,
            data: service
        });
    }
    async deleteService(req, res, _next) {
        const success = await this._deleteServiceUseCase.execute(req.params.id);
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
        const services = await this._getAllServicesUseCase.execute(req.query);
        res.json({
            success: true,
            data: services
        });
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=ServiceController.js.map