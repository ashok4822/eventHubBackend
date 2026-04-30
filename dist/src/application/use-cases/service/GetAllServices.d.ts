import { ServiceRepository, ServiceFilters } from '../../ports/ServiceRepository';
import { QueryOptions } from '../../ports/QueryOptions';
import { IGetAllServices } from '../../ports/IUseCases';
import { ServiceDTO } from '../../dtos/ServiceDTO';
/**
 * Use case for retrieving all services.
 */
export declare class GetAllServices implements IGetAllServices {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(query: QueryOptions & ServiceFilters): Promise<{
        services: ServiceDTO[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
}
//# sourceMappingURL=GetAllServices.d.ts.map