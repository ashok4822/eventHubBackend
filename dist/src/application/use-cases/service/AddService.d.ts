import { IServiceRepository } from '../../ports/ServiceRepository';
import { IAddService } from '../../ports/IUseCases';
import { IServiceDTO } from '../../dtos/ServiceDTO';
/**
 * Use case for adding a new service.
 */
export declare class AddService implements IAddService {
    private serviceRepository;
    constructor(serviceRepository: IServiceRepository);
    execute(serviceData: Parameters<IAddService['execute']>[0]): Promise<IServiceDTO>;
}
//# sourceMappingURL=AddService.d.ts.map