import { IServiceRepository } from "../../ports/IServiceRepository";
import { IEditService } from "../../ports/IUseCases";
import { IServiceDTO } from "../../dtos/IServiceDTO";
/**
 * Use case for editing an existing service.
 */
export declare class EditService implements IEditService {
    private _serviceRepository;
    constructor(_serviceRepository: IServiceRepository);
    execute(id: string, serviceData: Parameters<IEditService["execute"]>[1]): Promise<IServiceDTO | null>;
}
//# sourceMappingURL=EditService.d.ts.map