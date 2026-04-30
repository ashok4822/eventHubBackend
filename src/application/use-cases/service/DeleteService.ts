import { ServiceRepository } from '../../ports/ServiceRepository';

import { IDeleteService } from '../../ports/IUseCases';

/**
 * Use case for deleting a service.
 */
export class DeleteService implements IDeleteService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.serviceRepository.delete(id);
  }
}
