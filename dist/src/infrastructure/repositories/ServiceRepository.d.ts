import { IServiceDocument } from '../database/models';
import { IServiceRepository, IServiceFilters } from '../../application/ports/ServiceRepository';
import { IQueryOptions } from '../../application/ports/QueryOptions';
import { IService } from '../../domain/entities/Service';
import { BaseRepository } from './BaseRepository';
/**
 * Implementation of the service repository.
 */
export declare class ServiceRepository extends BaseRepository<IService, IServiceDocument> implements IServiceRepository {
    constructor();
    findAll(filters: IServiceFilters, options: IQueryOptions): Promise<{
        services: IService[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
    update(id: string, serviceData: Partial<IService>): Promise<IService | null>;
}
//# sourceMappingURL=ServiceRepository.d.ts.map