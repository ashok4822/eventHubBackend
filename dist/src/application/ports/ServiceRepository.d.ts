import { IService } from '../../domain/entities/Service';
import { QueryOptions } from './QueryOptions';
export interface ServiceFilters {
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
}
export interface ServiceRepository {
    findById(id: string): Promise<IService | null>;
    save(service: IService): Promise<IService>;
    update(id: string, service: Partial<IService>): Promise<IService | null>;
    delete(id: string): Promise<boolean>;
    findAll(filters: ServiceFilters, options: QueryOptions): Promise<{
        services: IService[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
}
//# sourceMappingURL=ServiceRepository.d.ts.map