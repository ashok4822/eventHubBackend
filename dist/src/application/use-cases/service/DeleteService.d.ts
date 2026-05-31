import { IServiceRepository } from '../../ports/IServiceRepository';
import { IDeleteService } from '../../ports/IUseCases';
/**
 * Use case for deleting a service.
 */
export declare class DeleteService implements IDeleteService {
    private _serviceRepository;
    constructor(_serviceRepository: IServiceRepository);
    execute(id: string): Promise<boolean>;
}
//# sourceMappingURL=DeleteService.d.ts.map