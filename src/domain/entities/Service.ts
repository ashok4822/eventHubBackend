import { ServiceCategory } from '../constants/ServiceCategories';
export { ServiceCategory };

export interface IService {
  id?: string;
  title: string;
  category: ServiceCategory;
  pricePerDay: number;
  description: string;
  availabilityDates: string[]; // Array of ISO date strings
  contactDetails: string;
  location: string;
}

class Service implements IService {
  id?: string;
  title: string;
  category: ServiceCategory;
  pricePerDay: number;
  description: string;
  availabilityDates: string[];
  contactDetails: string;
  location: string;

  constructor({ id, title, category, pricePerDay, description, availabilityDates, contactDetails, location }: IService) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.pricePerDay = pricePerDay;
    this.description = description;
    this.availabilityDates = availabilityDates;
    this.contactDetails = contactDetails;
    this.location = location;
  }
}

export default Service;
