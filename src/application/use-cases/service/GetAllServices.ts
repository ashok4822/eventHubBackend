import { ServiceRepository, ServiceFilters } from '../../ports/ServiceRepository';
import { QueryOptions } from '../../ports/QueryOptions';
import { IGetAllServices } from '../../ports/IUseCases';
import { ServiceDTO } from '../../dtos/ServiceDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for retrieving all services.
 */
export class GetAllServices implements IGetAllServices {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(query: QueryOptions & ServiceFilters): Promise<{
    services: ServiceDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> {
    const { page, limit, sortBy, sortOrder, ...filters } = query;
    const options: QueryOptions = { 
      page: page ? Number(page) : undefined, 
      limit: limit ? Number(limit) : undefined, 
      sortBy, 
      sortOrder: sortOrder as 'asc' | 'desc'
    };
    
    const result = await this.serviceRepository.findAll(filters as ServiceFilters, options);
    
    return {
      ...result,
      services: result.services.map(service => AppMapper.toServiceDTO(service))
    };
  }
}

