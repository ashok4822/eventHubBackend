import express from 'express';
import { authController, serviceController, bookingController } from '../../infrastructure/config/dependencyInjection.js';
import { protect, admin } from '../../infrastructure/middlewares/authMiddleware.js';
import { validate } from '../../infrastructure/middlewares/validateMiddleware.js';
import { registerRules, loginRules, serviceRules, bookingRules } from '../../infrastructure/validation/validationRules.js';
import { authLimiter } from '../../infrastructure/middlewares/rateLimitMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/auth/register', authLimiter, registerRules, validate, (req, res) => authController.register(req, res));
router.post('/auth/login', authLimiter, loginRules, validate, (req, res) => authController.login(req, res));
router.post('/auth/refresh', (req, res) => authController.refresh(req, res));
router.post('/auth/logout', (req, res) => authController.logout(req, res));

// Service routes
router.get('/services', (req, res) => serviceController.getAllServices(req, res));
router.post('/services', protect, admin, serviceRules, validate, (req, res) => serviceController.addService(req, res));
router.put('/services/:id', protect, admin, serviceRules, validate, (req, res) => serviceController.editService(req, res));
router.delete('/services/:id', protect, admin, (req, res) => serviceController.deleteService(req, res));

// Booking routes
router.post('/bookings', protect, bookingRules, validate, (req, res) => bookingController.book(req, res));
router.get('/bookings/my', protect, (req, res) => bookingController.getUserBookings(req, res));
router.get('/bookings/admin', protect, admin, (req, res) => bookingController.getAllBookings(req, res));

export default router;
