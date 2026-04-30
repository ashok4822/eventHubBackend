import { ServiceRepository } from '../../ports/ServiceRepository';
import { IAddService } from '../../ports/IUseCases';
import { ServiceDTO } from '../../dtos/ServiceDTO';
/**
 * Use case for adding a new service.
 */
export declare class AddService implements IAddService {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(serviceData: Parameters<IAddService['execute']>[0]): Promise<ServiceDTO>;
}
//# sourceMappingURL=AddService.d.ts.map