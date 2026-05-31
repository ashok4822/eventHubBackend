import { IHttpRequest, IHttpResponse, HttpNext } from '../types/IHttpTypes';
import { IAddService, IEditService, IDeleteService, IGetAllServices } from '../../application/ports/IUseCases';
/**
 * Controller for managing services.
 */
export declare class ServiceController {
    private _addServiceUseCase;
    private _editServiceUseCase;
    private _deleteServiceUseCase;
    private _getAllServicesUseCase;
    constructor(_addServiceUseCase: IAddService, _editServiceUseCase: IEditService, _deleteServiceUseCase: IDeleteService, _getAllServicesUseCase: IGetAllServices);
    addService(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    editService(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    deleteService(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    getAllServices(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
}
//# sourceMappingURL=ServiceController.d.ts.map