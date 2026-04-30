import { ServiceRepository, ServiceFilters } from '../../application/ports/ServiceRepository';
import { QueryOptions } from '../../application/ports/QueryOptions';
import { IService } from '../../domain/entities/Service';
/**
 * Mongoose implementation of the service repository.
 */
export declare class MongooseServiceRepository implements ServiceRepository {
    save(serviceData: IService): Promise<IService>;
    findById(id: string): Promise<IService | null>;
    findAll(filters: ServiceFilters, options: QueryOptions): Promise<{
        services: IService[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
    update(id: string, serviceData: Partial<IService>): Promise<IService | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=MongooseServiceRepository.d.ts.map