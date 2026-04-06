/**
 * Use case for adding a new service.
 */
class AddService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  /**
   * Executes the service addition logic.
   * 
   * @param {Object} serviceData - Data for the new service.
   * @param {string} serviceData.title - Title of the service.
   * @param {string} serviceData.description - Detailed description.
   * @param {number} serviceData.pricePerDay - Daily rental price.
   * @param {string} serviceData.location - Service location.
   * @param {string} serviceData.contactDetails - Contact info for the provider.
   * @returns {Promise<Object>} The saved service object.
   * @throws {Error} If validation fails.
   */
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

/**
 * Use case for editing an existing service.
 */
class EditService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  /**
   * Executes the service update logic.
   * 
   * @param {string} id - The ID of the service to update.
   * @param {Object} serviceData - Updated service data.
   * @returns {Promise<Object>} The updated service object.
   * @throws {Error} If validation fails.
   */
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

/**
 * Use case for deleting a service.
 */
class DeleteService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  /**
   * Executes the service deletion logic.
   * 
   * @param {string} id - The ID of the service to delete.
   * @returns {Promise<void>}
   */
  async execute(id) {
    return await this.serviceRepository.delete(id);
  }
}

/**
 * Use case for retrieving all services.
 */
class GetAllServices {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  /**
   * Executes the service retrieval logic with filters, pagination, and sorting.
   * 
   * @param {Object} query - Query parameters from the request.
   * @returns {Promise<Object>} Paginated result of matching services.
   */
  async execute(query) {
    const { page, limit, sortBy, sortOrder, ...filters } = query;
    const options = { page, limit, sortBy, sortOrder };
    return await this.serviceRepository.findAll(filters, options);
  }
}

export { AddService, EditService, DeleteService, GetAllServices };
