"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeHandlers = exports.authMiddleware = exports.bookingController = exports.serviceController = exports.authController = void 0;
const MongooseUserRepository_1 = require("../repositories/MongooseUserRepository");
const MongooseServiceRepository_1 = require("../repositories/MongooseServiceRepository");
const MongooseBookingRepository_1 = require("../repositories/MongooseBookingRepository");
const BcryptPasswordHasher_1 = require("../security/BcryptPasswordHasher");
const JwtTokenService_1 = require("../services/JwtTokenService");
const EmailService_1 = require("../services/EmailService");
const ConsoleLogger_1 = require("../services/ConsoleLogger");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const HtmlEmailTemplateProvider_1 = require("../services/HtmlEmailTemplateProvider");
const EventEmitterBus_1 = require("../services/EventEmitterBus");
const EmailNotificationHandler_1 = require("../../application/handlers/EmailNotificationHandler");
const RegisterUser_1 = require("../../application/use-cases/user/RegisterUser");
const LoginUser_1 = require("../../application/use-cases/user/LoginUser");
const RefreshToken_1 = require("../../application/use-cases/user/RefreshToken");
const AddService_1 = require("../../application/use-cases/service/AddService");
const EditService_1 = require("../../application/use-cases/service/EditService");
const DeleteService_1 = require("../../application/use-cases/service/DeleteService");
const GetAllServices_1 = require("../../application/use-cases/service/GetAllServices");
const BookService_1 = require("../../application/use-cases/booking/BookService");
const GetUserBookings_1 = require("../../application/use-cases/booking/GetUserBookings");
const GetAdminBookings_1 = require("../../application/use-cases/booking/GetAdminBookings");
const AuthController_1 = require("../../interfaces/controllers/AuthController");
const ServiceController_1 = require("../../interfaces/controllers/ServiceController");
const BookingController_1 = require("../../interfaces/controllers/BookingController");
const AppConfig_1 = require("./AppConfig");
// 1. Repositories
const userRepository = new MongooseUserRepository_1.MongooseUserRepository();
const serviceRepository = new MongooseServiceRepository_1.MongooseServiceRepository();
const bookingRepository = new MongooseBookingRepository_1.MongooseBookingRepository();
// 2. Services
const passwordHasher = new BcryptPasswordHasher_1.BcryptPasswordHasher();
const tokenService = new JwtTokenService_1.JwtTokenService(AppConfig_1.AppConfig.JWT.ACCESS_SECRET, AppConfig_1.AppConfig.JWT.REFRESH_SECRET);
const templateProvider = new HtmlEmailTemplateProvider_1.HtmlEmailTemplateProvider();
const emailService = new EmailService_1.EmailService(AppConfig_1.AppConfig.EMAIL, templateProvider);
const logger = new ConsoleLogger_1.ConsoleLogger();
const authMiddleware = new authMiddleware_1.AuthMiddleware(tokenService);
exports.authMiddleware = authMiddleware;
const eventBus = new EventEmitterBus_1.EventEmitterBus();
// 3. Handlers
const emailNotificationHandler = new EmailNotificationHandler_1.EmailNotificationHandler(emailService, eventBus, logger);
/**
 * Initializes asynchronous handlers and listeners.
 * Call this during application startup.
 */
const initializeHandlers = () => {
    emailNotificationHandler.listen();
    logger.info('Asynchronous handlers initialized');
};
exports.initializeHandlers = initializeHandlers;
// 4. Use Cases
const registerUseCase = new RegisterUser_1.RegisterUser(userRepository, passwordHasher);
const loginUseCase = new LoginUser_1.LoginUser(userRepository, passwordHasher, tokenService);
const refreshTokenUseCase = new RefreshToken_1.RefreshToken(userRepository, tokenService);
const addServiceUseCase = new AddService_1.AddService(serviceRepository);
const editServiceUseCase = new EditService_1.EditService(serviceRepository);
const deleteServiceUseCase = new DeleteService_1.DeleteService(serviceRepository);
const getAllServicesUseCase = new GetAllServices_1.GetAllServices(serviceRepository);
const bookServiceUseCase = new BookService_1.BookService(bookingRepository, serviceRepository, userRepository, eventBus);
const getUserBookingsUseCase = new GetUserBookings_1.GetUserBookings(bookingRepository);
const getAdminBookingsUseCase = new GetAdminBookings_1.GetAdminBookings(bookingRepository);
// 4. Controllers
const authController = new AuthController_1.AuthController(registerUseCase, loginUseCase, refreshTokenUseCase, AppConfig_1.AppConfig.COOKIE_SETTINGS);
exports.authController = authController;
const serviceController = new ServiceController_1.ServiceController(addServiceUseCase, editServiceUseCase, deleteServiceUseCase, getAllServicesUseCase);
exports.serviceController = serviceController;
const bookingController = new BookingController_1.BookingController(bookServiceUseCase, getUserBookingsUseCase, getAdminBookingsUseCase);
exports.bookingController = bookingController;
//# sourceMappingURL=dependencyInjection.js.map