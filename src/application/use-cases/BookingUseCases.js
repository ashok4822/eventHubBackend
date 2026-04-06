/**
 * Use case for booking a service.
 */
class BookService {
  constructor(bookingRepository, serviceRepository, userRepository, emailService) {
    this.bookingRepository = bookingRepository;
    this.serviceRepository = serviceRepository;
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  /**
   * Executes the service booking logic, including price calculation and email notification.
   * 
   * @param {Object} bookingData - Data for the new booking.
   * @param {string} bookingData.userId - ID of the user making the booking.
   * @param {string} bookingData.serviceId - ID of the service being booked.
   * @param {string} bookingData.startDate - Start date of the booking (YYYY-MM-DD).
   * @param {string} bookingData.endDate - End date of the booking (YYYY-MM-DD).
   * @returns {Promise<Object>} The saved booking object.
   * @throws {Error} If dates are invalid or service not found.
   */
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

    const [user, service] = await Promise.all([
      this.userRepository.findById(userId),
      this.serviceRepository.findById(serviceId)
    ]);

    if (!user) {
      throw new Error('User not found');
    }
    if (!service) {
      throw new Error('Service not found');
    }

    // Calculate inclusive days (e.g., Oct 1 to Oct 3 = 3 days)
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const diffDays = Math.round(Math.abs(end - start) / MS_PER_DAY) + 1;

    const totalPrice = service.pricePerDay * diffDays;

    const booking = await this.bookingRepository.save({
      userId,
      serviceId,
      startDate,
      endDate,
      totalPrice
    });

    // Send confirmation email asynchronously
    this.emailService.sendBookingConfirmation(user, service, booking).catch(err => {
      console.error('Failed to send confirmation email async:', err);
    });

    return booking;
  }
}

/**
 * Use case for retrieving bookings for a specific user.
 */
class GetUserBookings {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  /**
   * Executes the retrieval logic for user bookings.
   * 
   * @param {string} userId - ID of the user.
   * @returns {Promise<Array>} List of user bookings.
   */
  async execute(userId) {
    return await this.bookingRepository.findByUserId(userId);
  }
}

/**
 * Use case for retrieving all bookings across the platform.
 */
class GetAdminBookings {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  /**
   * Executes the retrieval logic for all bookings.
   * 
   * @returns {Promise<Array>} List of all bookings.
   */
  async execute() {
    return await this.bookingRepository.findAll();
  }
}

export { BookService, GetUserBookings, GetAdminBookings };
