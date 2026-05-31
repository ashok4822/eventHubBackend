import { IServiceRepository } from "../../ports/IServiceRepository";
import { IService } from "../../../domain/entities/Service";
import { BadRequestError } from "../../errors/AppErrors";
import { IEditService } from "../../ports/IUseCases";
import { IServiceDTO } from "../../dtos/IServiceDTO";
import { AppMapper } from "../../mappers/AppMapper";

/**
 * Use case for editing an existing service.
 */
export class EditService implements IEditService {
  constructor(private _serviceRepository: IServiceRepository) {}

  async execute(
    id: string,
    serviceData: Parameters<IEditService["execute"]>[1],
  ): Promise<IServiceDTO | null> {
    if (serviceData.pricePerDay !== undefined && serviceData.pricePerDay <= 0) {
      throw new BadRequestError("Price per day must be a positive number");
    }
    const service = await this._serviceRepository.update(
      id,
      serviceData as Partial<IService>,
    );
    return service ? AppMapper.toServiceDTO(service) : null;
  }
}
