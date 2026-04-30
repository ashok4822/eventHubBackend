import { ServiceCategory } from '../../domain/entities/Service';

export interface ServiceDTO {
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

export interface CreateServiceRequestDTO {
  title: string;
  category: ServiceCategory;
  pricePerDay: number;
  description: string;
  availabilityDates: string[];
  contactDetails: string;
  location: string;
}
