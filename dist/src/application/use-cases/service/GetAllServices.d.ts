import { IServiceRepository, IServiceFilters } from '../../ports/ServiceRepository';
import { IQueryOptions } from '../../ports/QueryOptions';
import { IGetAllServices } from '../../ports/IUseCases';
import { IServiceDTO } from '../../dtos/ServiceDTO';
/**
 * Use case for retrieving all services.
 */
export declare class GetAllServices implements IGetAllServices {
    private serviceRepository;
    constructor(serviceRepository: IServiceRepository);
    execute(query: IQueryOptions & IServiceFilters): Promise<{
        services: IServiceDTO[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
}
//# sourceMappingURL=GetAllServices.d.ts.map