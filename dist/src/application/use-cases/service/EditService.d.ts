import { ServiceRepository } from '../../ports/ServiceRepository';
import { IEditService } from '../../ports/IUseCases';
import { ServiceDTO } from '../../dtos/ServiceDTO';
/**
 * Use case for editing an existing service.
 */
export declare class EditService implements IEditService {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(id: string, serviceData: Parameters<IEditService['execute']>[1]): Promise<ServiceDTO | null>;
}
//# sourceMappingURL=EditService.d.ts.map