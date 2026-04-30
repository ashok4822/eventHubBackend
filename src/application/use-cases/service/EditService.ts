import { ServiceRepository } from '../../ports/ServiceRepository';
import { IService } from '../../../domain/entities/Service';
import { BadRequestError } from '../../errors/AppErrors';
import { IEditService } from '../../ports/IUseCases';
import { ServiceDTO } from '../../dtos/ServiceDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for editing an existing service.
 */
export class EditService implements IEditService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string, serviceData: Parameters<IEditService['execute']>[1]): Promise<ServiceDTO | null> {
    if (serviceData.pricePerDay !== undefined && serviceData.pricePerDay <= 0) {
      throw new BadRequestError('Price per day must be a positive number');
    }
    const service = await this.serviceRepository.update(id, serviceData as Partial<IService>);
    return service ? AppMapper.toServiceDTO(service) : null;
  }
}

