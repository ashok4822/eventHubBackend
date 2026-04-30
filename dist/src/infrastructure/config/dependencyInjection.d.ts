import { AuthMiddleware } from '../middlewares/authMiddleware';
import { AuthController } from '../../interfaces/controllers/AuthController';
import { ServiceController } from '../../interfaces/controllers/ServiceController';
import { BookingController } from '../../interfaces/controllers/BookingController';
declare const authMiddleware: AuthMiddleware;
/**
 * Initializes asynchronous handlers and listeners.
 * Call this during application startup.
 */
declare const initializeHandlers: () => void;
declare const authController: AuthController;
declare const serviceController: ServiceController;
declare const bookingController: BookingController;
export { authController, serviceController, bookingController, authMiddleware, initializeHandlers };
//# sourceMappingURL=dependencyInjection.d.ts.map