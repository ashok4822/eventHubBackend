class AddService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(serviceData) {
    const { title, description, pricePerDay, location, contactDetails } = serviceData;
    if (!title || !description || !pricePerDay || !location || !contactDetails) {
      throw new Error('All fields (title, description, price, location, contact) are required');
    }
    if (pricePerDay <= 0) {
      throw new Error('Price per day must be a positive number');
    }
    return await this.serviceRepository.save(serviceData);
  }
}

class EditService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(id, serviceData) {
    const { title, description, pricePerDay, location, contactDetails } = serviceData;
    if (!title || !description || !pricePerDay || !location || !contactDetails) {
      throw new Error('All fields are required for updates');
    }
    if (pricePerDay <= 0) {
      throw new Error('Price per day must be a positive number');
    }
    return await this.serviceRepository.update(id, serviceData);
  }
}

class DeleteService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(id) {
    return await this.serviceRepository.delete(id);
  }
}

class GetAllServices {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(filters) {
    return await this.serviceRepository.findAll(filters);
  }
}

export { AddService, EditService, DeleteService, GetAllServices };
