import { IServiceRepository } from '../../ports/IServiceRepository';

import { IDeleteService } from '../../ports/IUseCases';

/**
 * Use case for deleting a service.
 */
export class DeleteService implements IDeleteService {
  constructor(private _serviceRepository: IServiceRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this._serviceRepository.delete(id);
  }
}
