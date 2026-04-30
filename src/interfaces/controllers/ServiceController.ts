import { HttpRequest, HttpResponse, HttpNext } from '../types/HttpTypes';
import { BadRequestError } from '../../application/errors/AppErrors';
import { STATUS_CODES } from '../constants/statusCodes';
import { MESSAGES } from '../constants/messages';
import { IAddService, IEditService, IDeleteService, IGetAllServices } from '../../application/ports/IUseCases';

/**
 * Controller for managing services.
 */
export class ServiceController {
  constructor(
    private addServiceUseCase: IAddService,
    private editServiceUseCase: IEditService,
    private deleteServiceUseCase: IDeleteService,
    private getAllServicesUseCase: IGetAllServices
  ) {}

  async addService(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const { title, description, pricePerDay, location, contactDetails, category, availabilityDates } = req.body;
    const service = await this.addServiceUseCase.execute({ 
      title, description, pricePerDay, location, contactDetails, category, availabilityDates 
    });
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      data: service
    });
  }

  async editService(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const { id } = req.params;
    const { title, description, pricePerDay, location, contactDetails, category, availabilityDates } = req.body;
    const service = await this.editServiceUseCase.execute(id as string, { 
      title, description, pricePerDay, location, contactDetails, category, availabilityDates 
    });
    res.json({
      success: true,
      data: service
    });
  }

  async deleteService(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const success = await this.deleteServiceUseCase.execute(req.params.id as string);
    if (success) {
      res.json({
        success: true,
        message: MESSAGES.SERVICE.DELETED
      });
    } else {
      throw new BadRequestError('Service not found or could not be deleted');
    }
  }

  async getAllServices(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const services = await this.getAllServicesUseCase.execute(req.query);
    res.json({
      success: true,
      data: services
    });
  }
}

