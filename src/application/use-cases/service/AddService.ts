import { ServiceRepository } from '../../ports/ServiceRepository';
import { IService } from '../../../domain/entities/Service';
import { BadRequestError } from '../../errors/AppErrors';
import { IAddService } from '../../ports/IUseCases';
import { ServiceDTO } from '../../dtos/ServiceDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for adding a new service.
 */
export class AddService implements IAddService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(serviceData: Parameters<IAddService['execute']>[0]): Promise<ServiceDTO> {
    if (serviceData.pricePerDay <= 0) {
      throw new BadRequestError('Price per day must be a positive number');
    }

    const service = await this.serviceRepository.save(serviceData as IService);

    return AppMapper.toServiceDTO(service);
  }
}

