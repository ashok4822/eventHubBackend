"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dependencyInjection_1 = require("../config/dependencyInjection");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const validationRules_1 = require("../validation/validationRules");
const rateLimitMiddleware_1 = require("../middlewares/rateLimitMiddleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
// Auth routes
router.post("/auth/register", rateLimitMiddleware_1.authLimiter, validationRules_1.registerRules, validateMiddleware_1.validate, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.authController.register(req, res, next)));
router.post("/auth/login", rateLimitMiddleware_1.authLimiter, validationRules_1.loginRules, validateMiddleware_1.validate, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.authController.login(req, res, next)));
router.post("/auth/refresh", (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.authController.refresh(req, res, next)));
router.post("/auth/logout", (0, asyncHandler_1.asyncHandler)((req, res) => dependencyInjection_1.authController.logout(req, res)));
router.post("/auth/forgot-password", (0, asyncHandler_1.asyncHandler)((req, res) => dependencyInjection_1.authController.forgotPassword(req, res)));
router.post("/auth/reset-password/:token", (0, asyncHandler_1.asyncHandler)((req, res) => dependencyInjection_1.authController.resetPassword(req, res)));
// Service routes
router.get("/services", (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.serviceController.getAllServices(req, res, next)));
router.post("/services", dependencyInjection_1.authMiddleware.protect, dependencyInjection_1.authMiddleware.admin, validationRules_1.serviceRules, validateMiddleware_1.validate, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.serviceController.addService(req, res, next)));
router.put("/services/:id", dependencyInjection_1.authMiddleware.protect, dependencyInjection_1.authMiddleware.admin, validationRules_1.serviceRules, validateMiddleware_1.validate, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.serviceController.editService(req, res, next)));
router.delete("/services/:id", dependencyInjection_1.authMiddleware.protect, dependencyInjection_1.authMiddleware.admin, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.serviceController.deleteService(req, res, next)));
// Booking routes
router.post("/bookings", dependencyInjection_1.authMiddleware.protect, validationRules_1.bookingRules, validateMiddleware_1.validate, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.bookingController.book(req, res, next)));
router.get("/bookings/my", dependencyInjection_1.authMiddleware.protect, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.bookingController.getUserBookings(req, res, next)));
router.get("/bookings/admin", dependencyInjection_1.authMiddleware.protect, dependencyInjection_1.authMiddleware.admin, (0, asyncHandler_1.asyncHandler)((req, res, next) => dependencyInjection_1.bookingController.getAllBookings(req, res, next)));
exports.default = router;
//# sourceMappingURL=expressRoutes.js.map