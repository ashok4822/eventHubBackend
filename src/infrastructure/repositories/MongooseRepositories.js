import { UserModel, ServiceModel, BookingModel } from '../database/models.js';

class MongooseUserRepository {
  async save(user) {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return savedUser;
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }
}

class MongooseServiceRepository {
  async save(serviceData) {
    const newService = new ServiceModel(serviceData);
    return await newService.save();
  }

  async findById(id) {
    return await ServiceModel.findById(id);
  }

  async findAll(filters = {}) {
    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
    if (filters.minPrice || filters.maxPrice) {
      query.pricePerDay = {};
      if (filters.minPrice) query.pricePerDay.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.pricePerDay.$lte = Number(filters.maxPrice);
    }
    // Date filter: service must be available for ALL of the range
    // Assuming availabilityDates contains strings of dates that ARE available
    // This part might need adjustment depending on how we want to handle range vs single date
    
    return await ServiceModel.find(query);
  }

  async update(id, serviceData) {
    return await ServiceModel.findByIdAndUpdate(id, serviceData, { new: true });
  }

  async delete(id) {
    return await ServiceModel.findByIdAndDelete(id);
  }
}

class MongooseBookingRepository {
  async save(bookingData) {
    const newBooking = new BookingModel(bookingData);
    return await newBooking.save();
  }

  async findByUserId(userId) {
    return await BookingModel.find({ userId }).populate('serviceId');
  }

  async findByServiceId(serviceId) {
    return await BookingModel.find({ serviceId }).populate('userId');
  }

  async findAll() {
    return await BookingModel.find().populate('userId').populate('serviceId');
  }
}

export { MongooseUserRepository, MongooseServiceRepository, MongooseBookingRepository };
