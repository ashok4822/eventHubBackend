import { ServiceModel, IServiceDocument } from '../database/models';
import { IServiceRepository, IServiceFilters } from '../../application/ports/IServiceRepository';
import { IQueryOptions } from '../../application/ports/IQueryOptions';
import { IService } from '../../domain/entities/Service';
import { ServiceMapper } from './Mappers';
import { BaseRepository } from './BaseRepository';
import { UpdateQuery } from 'mongoose';

/**
 * Implementation of the service repository.
 */
export class ServiceRepository extends BaseRepository<IService, IServiceDocument> implements IServiceRepository {
  constructor() {
    super(ServiceModel, ServiceMapper);
  }

  async findAll(
    filters: IServiceFilters,
    options: IQueryOptions
  ): Promise<{
    services: IService[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> {
    const query: Record<string, unknown> = {};

    if (filters.category) query.category = filters.category;
    if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
    if (filters.minPrice || filters.maxPrice) {
      const priceQuery: Record<string, number> = {};
      if (filters.minPrice) priceQuery.$gte = Number(filters.minPrice);
      if (filters.maxPrice) priceQuery.$lte = Number(filters.maxPrice);
      query.pricePerDay = priceQuery;
    }

    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy: string = options.sortBy || 'createdAt';
    const sortOrder: 1 | -1 = options.sortOrder === 'asc' ? 1 : -1;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder };

    const [services, totalCount] = await Promise.all([
      ServiceModel.find(query).sort(sort).skip(skip).limit(limit),
      ServiceModel.countDocuments(query),
    ]);

    return {
      services: services.map(ServiceMapper.toDomain),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  async update(id: string, serviceData: Partial<IService>): Promise<IService | null> {
    const updated = await ServiceModel.findByIdAndUpdate(id, serviceData as UpdateQuery<IServiceDocument>, { new: true });
    return updated ? ServiceMapper.toDomain(updated) : null;
  }
}
