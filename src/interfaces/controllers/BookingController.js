import { STATUS_CODES } from '../constants/statusCodes.js';

/**
 * Controller for managing service bookings.
 */
class BookingController {
  constructor(bookServiceUseCase, getUserBookingsUseCase, getAdminBookingsUseCase) {
    this.bookServiceUseCase = bookServiceUseCase;
    this.getUserBookingsUseCase = getUserBookingsUseCase;
    this.getAdminBookingsUseCase = getAdminBookingsUseCase;
  }

  /**
   * Creates a new booking for a service.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async book(req, res) {
    try {
      const booking = await this.bookServiceUseCase.execute({ ...req.body, userId: req.user.id });
      res.status(STATUS_CODES.CREATED).json(booking);
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }

  /**
   * Retrieves all bookings for the authenticated user.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getUserBookings(req, res) {
    try {
      const bookings = await this.getUserBookingsUseCase.execute(req.user.id);
      res.json(bookings);
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }

  /**
   * Retrieves all bookings across the platform (Admin only).
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllBookings(req, res) {
    try {
      const bookings = await this.getAdminBookingsUseCase.execute();
      res.json(bookings);
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }
}

export { BookingController };
