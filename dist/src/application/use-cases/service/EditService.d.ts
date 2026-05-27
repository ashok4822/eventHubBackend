import { IServiceRepository } from "../../ports/ServiceRepository";
import { IEditService } from "../../ports/IUseCases";
import { IServiceDTO } from "../../dtos/ServiceDTO";
/**
 * Use case for editing an existing service.
 */
export declare class EditService implements IEditService {
    private serviceRepository;
    constructor(serviceRepository: IServiceRepository);
    execute(id: string, serviceData: Parameters<IEditService["execute"]>[1]): Promise<IServiceDTO | null>;
}
//# sourceMappingURL=EditService.d.ts.map