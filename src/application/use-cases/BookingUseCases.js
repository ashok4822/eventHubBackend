class BookService {
  constructor(bookingRepository, serviceRepository) {
    this.bookingRepository = bookingRepository;
    this.serviceRepository = serviceRepository;
  }

  async execute({ userId, serviceId, startDate, endDate }) {
    if (!startDate || !endDate) {
      throw new Error('Start date and end date are required');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      throw new Error('Start date cannot be in the past');
    }

    if (end < start) {
      throw new Error('End date must be after start date');
    }

    const service = await this.serviceRepository.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // At least 1 day

    const totalPrice = service.pricePerDay * diffDays;

    return await this.bookingRepository.save({
      userId,
      serviceId,
      startDate,
      endDate,
      totalPrice
    });
  }
}

class GetUserBookings {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(userId) {
    return await this.bookingRepository.findByUserId(userId);
  }
}

class GetAdminBookings {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute() {
    return await this.bookingRepository.findAll();
  }
}

export { BookService, GetUserBookings, GetAdminBookings };
