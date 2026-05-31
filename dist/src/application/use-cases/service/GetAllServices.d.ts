import { IServiceRepository, IServiceFilters } from '../../ports/IServiceRepository';
import { IQueryOptions } from '../../ports/IQueryOptions';
import { IGetAllServices } from '../../ports/IUseCases';
import { IServiceDTO } from '../../dtos/IServiceDTO';
/**
 * Use case for retrieving all services.
 */
export declare class GetAllServices implements IGetAllServices {
    private _serviceRepository;
    constructor(_serviceRepository: IServiceRepository);
    execute(query: IQueryOptions & IServiceFilters): Promise<{
        services: IServiceDTO[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
}
//# sourceMappingURL=GetAllServices.d.ts.map