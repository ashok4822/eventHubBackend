import { IService } from '../../domain/entities/Service';
import { IQueryOptions } from './QueryOptions';
import { IBaseRepository } from './BaseRepository';
export interface IServiceFilters {
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
}
export interface IServiceRepository extends IBaseRepository<IService> {
    update(id: string, service: Partial<IService>): Promise<IService | null>;
    findAll(filters: IServiceFilters, options: IQueryOptions): Promise<{
        services: IService[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
}
//# sourceMappingURL=ServiceRepository.d.ts.map