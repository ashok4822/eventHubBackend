import { STATUS_CODES } from '../constants/statusCodes.js';

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

  /**
   * Adds a new service to the platform.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async addService(req, res) {
    try {
      const service = await this.addServiceUseCase.execute(req.body);
      res.status(STATUS_CODES.CREATED).json(service);
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }

  /**
   * Updates an existing service.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async editService(req, res) {
    try {
      const service = await this.editServiceUseCase.execute(req.params.id, req.body);
      res.json(service);
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }

  /**
   * Deletes a service from the platform.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteService(req, res) {
    try {
      await this.deleteServiceUseCase.execute(req.params.id);
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }

  /**
   * Retrieves all services, with optional filtering.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllServices(req, res) {
    try {
      const services = await this.getAllServicesUseCase.execute(req.query);
      res.json(services);
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }
}

export { ServiceController };
