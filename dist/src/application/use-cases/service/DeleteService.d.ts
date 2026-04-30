import { ServiceRepository } from '../../ports/ServiceRepository';
import { IDeleteService } from '../../ports/IUseCases';
/**
 * Use case for deleting a service.
 */
export declare class DeleteService implements IDeleteService {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(id: string): Promise<boolean>;
}
//# sourceMappingURL=DeleteService.d.ts.map