import { IServiceRepository } from '../../ports/IServiceRepository';
import { IAddService } from '../../ports/IUseCases';
import { IServiceDTO } from '../../dtos/IServiceDTO';
/**
 * Use case for adding a new service.
 */
export declare class AddService implements IAddService {
    private _serviceRepository;
    constructor(_serviceRepository: IServiceRepository);
    execute(serviceData: Parameters<IAddService['execute']>[0]): Promise<IServiceDTO>;
}
//# sourceMappingURL=AddService.d.ts.map