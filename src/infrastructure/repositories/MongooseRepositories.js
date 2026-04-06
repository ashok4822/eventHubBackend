import { UserModel, ServiceModel, BookingModel } from '../database/models.js';

/**
 * Mongoose implementation of the user repository.
 */
class MongooseUserRepository {
  /**
   * Saves a new user to the database.
   * @param {Object} user - User data.
   * @returns {Promise<Object>} The saved user document.
   */
  async save(user) {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return savedUser;
  }

  /**
   * Finds a user by their email address.
   * @param {string} email - The email to search for.
   * @returns {Promise<Object|null>} The user document or null.
   */
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  /**
   * Finds a user by their ID.
   * @param {string} id - The user ID.
   * @returns {Promise<Object|null>} The user document or null.
   */
  async findById(id) {
    return await UserModel.findById(id);
  }
}

/**
 * Mongoose implementation of the service repository.
 */
class MongooseServiceRepository {
  /**
   * Saves a new service to the database.
   * @param {Object} serviceData - Service data.
   * @returns {Promise<Object>} The saved service document.
   */
  async save(serviceData) {
    const newService = new ServiceModel(serviceData);
    return await newService.save();
  }

  /**
   * Finds a service by its ID.
   * @param {string} id - The service ID.
   * @returns {Promise<Object|null>} The service document or null.
   */
  async findById(id) {
    return await ServiceModel.findById(id);
  }

  /**
   * Finds all services based on provided filters, with pagination and sorting.
   * @param {Object} filters - Filtering criteria (category, location, price range).
   * @param {Object} options - Pagination and sorting options (page, limit, sortBy, sortOrder).
   * @returns {Promise<Object>} Paginated object containing services and metadata.
   */
  async findAll(filters = {}, options = {}) {
    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
    if (filters.minPrice || filters.maxPrice) {
      query.pricePerDay = {};
      if (filters.minPrice) query.pricePerDay.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.pricePerDay.$lte = Number(filters.maxPrice);
    }

    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    const [services, totalCount] = await Promise.all([
      ServiceModel.find(query).sort(sort).skip(skip).limit(limit),
      ServiceModel.countDocuments(query)
    ]);

    return {
      services,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    };
  }

  /**
   * Updates an existing service in the database.
   * @param {string} id - The service ID.
   * @param {Object} serviceData - Updated service data.
   * @returns {Promise<Object|null>} The updated document or null.
   */
  async update(id, serviceData) {
    return await ServiceModel.findByIdAndUpdate(id, serviceData, { new: true });
  }

  /**
   * Deletes a service from the database.
   * @param {string} id - The service ID.
   * @returns {Promise<Object|null>} The deleted document or null.
   */
  async delete(id) {
    return await ServiceModel.findByIdAndDelete(id);
  }
}

/**
 * Mongoose implementation of the booking repository.
 */
class MongooseBookingRepository {
  /**
   * Saves a new booking to the database.
   * @param {Object} bookingData - Booking data.
   * @returns {Promise<Object>} The saved booking document.
   */
  async save(bookingData) {
    const newBooking = new BookingModel(bookingData);
    return await newBooking.save();
  }

  /**
   * Finds all bookings for a specific user.
   * @param {string} userId - The user ID.
   * @returns {Promise<Array>} List of booking documents with populated service details.
   */
  async findByUserId(userId) {
    return await BookingModel.find({ userId }).populate('serviceId');
  }

  /**
   * Finds all bookings for a specific service.
   * @param {string} serviceId - The service ID.
   * @returns {Promise<Array>} List of booking documents with populated user details.
   */
  async findByServiceId(serviceId) {
    return await BookingModel.find({ serviceId }).populate('userId');
  }

  /**
   * Finds all bookings in the system.
   * @returns {Promise<Array>} List of all booking documents with populated details.
   */
  async findAll() {
    return await BookingModel.find().populate('userId').populate('serviceId');
  }
}

export { MongooseUserRepository, MongooseServiceRepository, MongooseBookingRepository };
