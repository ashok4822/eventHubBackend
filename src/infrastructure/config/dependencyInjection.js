import { MongooseUserRepository, MongooseServiceRepository, MongooseBookingRepository } from '../repositories/MongooseRepositories.js';
import { BcryptPasswordHasher } from '../security/BcryptPasswordHasher.js';
import { JwtTokenService } from '../services/JwtTokenService.js';
import { EmailService } from '../services/EmailService.js';

import { RegisterUser, LoginUser } from '../../application/use-cases/UserUseCases.js';
import { AddService, EditService, DeleteService, GetAllServices } from '../../application/use-cases/ServiceUseCases.js';
import { BookService, GetUserBookings, GetAdminBookings } from '../../application/use-cases/BookingUseCases.js';

import { AuthController } from '../../interfaces/controllers/AuthController.js';
import { ServiceController } from '../../interfaces/controllers/ServiceController.js';
import { BookingController } from '../../interfaces/controllers/BookingController.js';

// 1. Repositories
const userRepository = new MongooseUserRepository();
const serviceRepository = new MongooseServiceRepository();
const bookingRepository = new MongooseBookingRepository();

// 2. Services
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();
const emailService = new EmailService();

// 3. Use Cases
const registerUseCase = new RegisterUser(userRepository, passwordHasher);
const loginUseCase = new LoginUser(userRepository, passwordHasher, tokenService);

const addServiceUseCase = new AddService(serviceRepository);
const editServiceUseCase = new EditService(serviceRepository);
const deleteServiceUseCase = new DeleteService(serviceRepository);
const getAllServicesUseCase = new GetAllServices(serviceRepository);

const bookServiceUseCase = new BookService(bookingRepository, serviceRepository, userRepository, emailService);
const getUserBookingsUseCase = new GetUserBookings(bookingRepository);
const getAdminBookingsUseCase = new GetAdminBookings(bookingRepository);

// 4. Controllers
const authController = new AuthController(registerUseCase, loginUseCase, userRepository, tokenService);
const serviceController = new ServiceController(addServiceUseCase, editServiceUseCase, deleteServiceUseCase, getAllServicesUseCase);
const bookingController = new BookingController(bookServiceUseCase, getUserBookingsUseCase, getAdminBookingsUseCase);

export {
  authController,
  serviceController,
  bookingController
};
