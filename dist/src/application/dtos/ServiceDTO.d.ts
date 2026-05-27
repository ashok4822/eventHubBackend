import { ServiceCategory } from '../../domain/entities/Service';
export interface IServiceDTO {
    id: string;
    _id?: string;
    title: string;
    category: ServiceCategory;
    pricePerDay: number;
    description: string;
    availabilityDates: string[];
    contactDetails: string;
    location: string;
}
export interface ICreateServiceRequestDTO {
    title: string;
    category: ServiceCategory;
    pricePerDay: number;
    description: string;
    availabilityDates: string[];
    contactDetails: string;
    location: string;
}
//# sourceMappingURL=ServiceDTO.d.ts.map