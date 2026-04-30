import { ServiceModel } from '../database/models';
import { ServiceRepository, ServiceFilters } from '../../application/ports/ServiceRepository';
import { QueryOptions } from '../../application/ports/QueryOptions';
import { IService } from '../../domain/entities/Service';
import { ServiceMapper } from './Mappers';

/**
 * Mongoose implementation of the service repository.
 */
export class MongooseServiceRepository implements ServiceRepository {
  async save(serviceData: IService): Promise<IService> {
    const newService = new ServiceModel(serviceData);
    const saved = await newService.save();
    return ServiceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<IService | null> {
    const service = await ServiceModel.findById(id);
    return service ? ServiceMapper.toDomain(service) : null;
  }

  async findAll(
    filters: ServiceFilters,
    options: QueryOptions
  ): Promise<{
    services: IService[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> {
    const query: Record<string, any> = {};

    if (filters.category) query.category = filters.category;
    if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
    if (filters.minPrice || filters.maxPrice) {
      query.pricePerDay = {} as Record<string, number>;
      if (filters.minPrice) query.pricePerDay.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.pricePerDay.$lte = Number(filters.maxPrice);
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
    const updated = await ServiceModel.findByIdAndUpdate(id, serviceData, { new: true });
    return updated ? ServiceMapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ServiceModel.findByIdAndDelete(id);
    return !!result;
  }
}
