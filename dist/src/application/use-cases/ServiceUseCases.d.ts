import { ServiceRepository, ServiceFilters } from '../ports/ServiceRepository';
import { QueryOptions } from '../ports/QueryOptions';
import { IService } from '../../domain/entities/Service';
interface ServiceData {
    title: string;
    description: string;
    pricePerDay: number;
    location: string;
    contactDetails: string;
    category?: string;
    availabilityDates?: string[];
}
/**
 * Use case for adding a new service.
 */
export declare class AddService {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(serviceData: ServiceData): Promise<IService>;
}
/**
 * Use case for editing an existing service.
 */
export declare class EditService {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(id: string, serviceData: ServiceData): Promise<IService | null>;
}
/**
 * Use case for deleting a service.
 */
export declare class DeleteService {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(id: string): Promise<boolean>;
}
/**
 * Use case for retrieving all services.
 */
export declare class GetAllServices {
    private serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    execute(query: QueryOptions & ServiceFilters): Promise<{
        services: IService[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
}
export {};
//# sourceMappingURL=ServiceUseCases.d.ts.map