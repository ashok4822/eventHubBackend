import { IServiceRepository } from '../../ports/ServiceRepository';
import { IDeleteService } from '../../ports/IUseCases';
/**
 * Use case for deleting a service.
 */
export declare class DeleteService implements IDeleteService {
    private serviceRepository;
    constructor(serviceRepository: IServiceRepository);
    execute(id: string): Promise<boolean>;
}
//# sourceMappingURL=DeleteService.d.ts.map