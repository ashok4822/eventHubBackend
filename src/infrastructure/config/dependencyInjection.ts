import { MongooseUserRepository } from '../repositories/MongooseUserRepository';
import { MongooseServiceRepository } from '../repositories/MongooseServiceRepository';
import { MongooseBookingRepository } from '../repositories/MongooseBookingRepository';
import { BcryptPasswordHasher } from '../security/BcryptPasswordHasher';
import { JwtTokenService } from '../services/JwtTokenService';
import { EmailService } from '../services/EmailService';
import { ConsoleLogger } from '../services/ConsoleLogger';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { HtmlEmailTemplateProvider } from '../services/HtmlEmailTemplateProvider';
import { EventEmitterBus } from '../services/EventEmitterBus';
import { EmailNotificationHandler } from '../../application/handlers/EmailNotificationHandler';

import { RegisterUser } from '../../application/use-cases/user/RegisterUser';
import { LoginUser } from '../../application/use-cases/user/LoginUser';
import { RefreshToken } from '../../application/use-cases/user/RefreshToken';
import { RequestPasswordReset } from '../../application/use-cases/user/RequestPasswordReset';
import { ResetPassword } from '../../application/use-cases/user/ResetPassword';
import { AddService } from '../../application/use-cases/service/AddService';
import { EditService } from '../../application/use-cases/service/EditService';
import { DeleteService } from '../../application/use-cases/service/DeleteService';
import { GetAllServices } from '../../application/use-cases/service/GetAllServices';
import { BookService } from '../../application/use-cases/booking/BookService';
import { GetUserBookings } from '../../application/use-cases/booking/GetUserBookings';
import { GetAdminBookings } from '../../application/use-cases/booking/GetAdminBookings';

import { AuthController } from '../../interfaces/controllers/AuthController';
import { ServiceController } from '../../interfaces/controllers/ServiceController';
import { BookingController } from '../../interfaces/controllers/BookingController';

import { AppConfig } from './AppConfig';

// 1. Repositories
const userRepository = new MongooseUserRepository();
const serviceRepository = new MongooseServiceRepository();
const bookingRepository = new MongooseBookingRepository();

// 2. Services
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService(AppConfig.JWT.ACCESS_SECRET, AppConfig.JWT.REFRESH_SECRET);
const templateProvider = new HtmlEmailTemplateProvider();
const emailService = new EmailService(AppConfig.EMAIL, templateProvider);
const logger = new ConsoleLogger();
const authMiddleware = new AuthMiddleware(tokenService);
const eventBus = new EventEmitterBus();

// 3. Handlers
const emailNotificationHandler = new EmailNotificationHandler(emailService, eventBus, logger);

/**
 * Initializes asynchronous handlers and listeners.
 * Call this during application startup.
 */
const initializeHandlers = (): void => {
  emailNotificationHandler.listen();
  logger.info('Asynchronous handlers initialized');
};

// 4. Use Cases
const registerUseCase = new RegisterUser(userRepository, passwordHasher);
const loginUseCase = new LoginUser(userRepository, passwordHasher, tokenService);
const refreshTokenUseCase = new RefreshToken(userRepository, tokenService);
const requestPasswordResetUseCase = new RequestPasswordReset(userRepository, emailService);
const resetPasswordUseCase = new ResetPassword(userRepository, passwordHasher);

const addServiceUseCase = new AddService(serviceRepository);
const editServiceUseCase = new EditService(serviceRepository);
const deleteServiceUseCase = new DeleteService(serviceRepository);
const getAllServicesUseCase = new GetAllServices(serviceRepository);

const bookServiceUseCase = new BookService(bookingRepository, serviceRepository, userRepository, eventBus);
const getUserBookingsUseCase = new GetUserBookings(bookingRepository);
const getAdminBookingsUseCase = new GetAdminBookings(bookingRepository);

// 4. Controllers
const authController = new AuthController(
  registerUseCase, 
  loginUseCase, 
  refreshTokenUseCase, 
  requestPasswordResetUseCase, 
  resetPasswordUseCase, 
  AppConfig.COOKIE_SETTINGS
);
const serviceController = new ServiceController(addServiceUseCase, editServiceUseCase, deleteServiceUseCase, getAllServicesUseCase);
const bookingController = new BookingController(bookServiceUseCase, getUserBookingsUseCase, getAdminBookingsUseCase);

export { 
  authController, 
  serviceController, 
  bookingController, 
  authMiddleware,
  initializeHandlers 
};


