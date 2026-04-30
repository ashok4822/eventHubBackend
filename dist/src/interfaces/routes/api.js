"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dependencyInjection_1 = require("../../infrastructure/config/dependencyInjection");
const authMiddleware_1 = require("../../infrastructure/middlewares/authMiddleware");
const validateMiddleware_1 = require("../../infrastructure/middlewares/validateMiddleware");
const validationRules_1 = require("../../infrastructure/validation/validationRules");
const rateLimitMiddleware_1 = require("../../infrastructure/middlewares/rateLimitMiddleware");
const router = express_1.default.Router();
// Auth routes
router.post('/auth/register', rateLimitMiddleware_1.authLimiter, validationRules_1.registerRules, validateMiddleware_1.validate, (req, res) => dependencyInjection_1.authController.register(req, res));
router.post('/auth/login', rateLimitMiddleware_1.authLimiter, validationRules_1.loginRules, validateMiddleware_1.validate, (req, res) => dependencyInjection_1.authController.login(req, res));
router.post('/auth/refresh', (req, res) => dependencyInjection_1.authController.refresh(req, res));
router.post('/auth/logout', (req, res) => dependencyInjection_1.authController.logout(req, res));
// Service routes
router.get('/services', (req, res) => dependencyInjection_1.serviceController.getAllServices(req, res));
router.post('/services', authMiddleware_1.protect, authMiddleware_1.admin, validationRules_1.serviceRules, validateMiddleware_1.validate, (req, res) => dependencyInjection_1.serviceController.addService(req, res));
router.put('/services/:id', authMiddleware_1.protect, authMiddleware_1.admin, validationRules_1.serviceRules, validateMiddleware_1.validate, (req, res) => dependencyInjection_1.serviceController.editService(req, res));
router.delete('/services/:id', authMiddleware_1.protect, authMiddleware_1.admin, (req, res) => dependencyInjection_1.serviceController.deleteService(req, res));
// Booking routes
router.post('/bookings', authMiddleware_1.protect, validationRules_1.bookingRules, validateMiddleware_1.validate, (req, res) => dependencyInjection_1.bookingController.book(req, res));
router.get('/bookings/my', authMiddleware_1.protect, (req, res) => dependencyInjection_1.bookingController.getUserBookings(req, res));
router.get('/bookings/admin', authMiddleware_1.protect, authMiddleware_1.admin, (req, res) => dependencyInjection_1.bookingController.getAllBookings(req, res));
exports.default = router;
//# sourceMappingURL=api.js.map