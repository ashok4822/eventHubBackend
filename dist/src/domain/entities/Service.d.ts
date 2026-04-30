import { ServiceCategory } from '../constants/ServiceCategories';
export { ServiceCategory };
export interface IService {
    id?: string;
    title: string;
    category: ServiceCategory;
    pricePerDay: number;
    description: string;
    availabilityDates: string[];
    contactDetails: string;
    location: string;
}
declare class Service implements IService {
    id?: string;
    title: string;
    category: ServiceCategory;
    pricePerDay: number;
    description: string;
    availabilityDates: string[];
    contactDetails: string;
    location: string;
    constructor({ id, title, category, pricePerDay, description, availabilityDates, contactDetails, location }: IService);
}
export default Service;
//# sourceMappingURL=Service.d.ts.map