import { IServiceRepository, IServiceFilters } from '../../ports/ServiceRepository';
import { IQueryOptions } from '../../ports/QueryOptions';
import { IGetAllServices } from '../../ports/IUseCases';
import { IServiceDTO } from '../../dtos/ServiceDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for retrieving all services.
 */
export class GetAllServices implements IGetAllServices {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(query: IQueryOptions & IServiceFilters): Promise<{
    services: IServiceDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> {
    const { page, limit, sortBy, sortOrder, ...filters } = query;
    const options: IQueryOptions = { 
      page: page ? Number(page) : undefined, 
      limit: limit ? Number(limit) : undefined, 
      sortBy, 
      sortOrder: sortOrder as 'asc' | 'desc'
    };
    
    const result = await this.serviceRepository.findAll(filters as IServiceFilters, options);
    
    return {
      ...result,
      services: result.services.map(service => AppMapper.toServiceDTO(service))
    };
  }
}

