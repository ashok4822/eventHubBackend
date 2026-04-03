import express from 'express';
import { register, login } from '../controllers/AuthController.js';
import { addService, editService, deleteService, getAllServices } from '../controllers/ServiceController.js';
import { book, getUserBookings, getAllBookings } from '../controllers/BookingController.js';
import { protect, admin } from '../../infrastructure/middlewares/authMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Service routes
router.get('/services', getAllServices);
router.post('/services', protect, admin, addService);
router.put('/services/:id', protect, admin, editService);
router.delete('/services/:id', protect, admin, deleteService);

// Booking routes
router.post('/bookings', protect, book);
router.get('/bookings/my', protect, getUserBookings);
router.get('/bookings/admin', protect, admin, getAllBookings);

export default router;
