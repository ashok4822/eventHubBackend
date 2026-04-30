import { HttpRequest, HttpResponse, HttpNext } from '../types/HttpTypes';
import { IAddService, IEditService, IDeleteService, IGetAllServices } from '../../application/ports/IUseCases';
/**
 * Controller for managing services.
 */
export declare class ServiceController {
    private addServiceUseCase;
    private editServiceUseCase;
    private deleteServiceUseCase;
    private getAllServicesUseCase;
    constructor(addServiceUseCase: IAddService, editServiceUseCase: IEditService, deleteServiceUseCase: IDeleteService, getAllServicesUseCase: IGetAllServices);
    addService(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    editService(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    deleteService(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    getAllServices(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
}
//# sourceMappingURL=ServiceController.d.ts.map