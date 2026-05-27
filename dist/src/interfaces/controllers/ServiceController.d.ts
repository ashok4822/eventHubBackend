import { IHttpRequest, IHttpResponse, HttpNext } from '../types/HttpTypes';
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
    addService(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    editService(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    deleteService(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    getAllServices(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
}
//# sourceMappingURL=ServiceController.d.ts.map