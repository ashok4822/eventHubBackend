import { BookService, GetUserBookings, GetAdminBookings } from '../../application/use-cases/BookingUseCases.js';
import { MongooseBookingRepository, MongooseServiceRepository } from '../../infrastructure/repositories/MongooseRepositories.js';

const bookingRepository = new MongooseBookingRepository();
const serviceRepository = new MongooseServiceRepository();

const book = async (req, res) => {
  try {
    const bookUseCase = new BookService(bookingRepository, serviceRepository);
    const booking = await bookUseCase.execute({ ...req.body, userId: req.user.id });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const getUserBookingsUseCase = new GetUserBookings(bookingRepository);
    const bookings = await getUserBookingsUseCase.execute(req.user.id);
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const getAllBookingsUseCase = new GetAdminBookings(bookingRepository);
    const bookings = await getAllBookingsUseCase.execute();
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { book, getUserBookings, getAllBookings };
