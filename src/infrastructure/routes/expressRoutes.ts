import express, { Router, Request, Response, NextFunction } from "express";
import {
  authController,
  serviceController,
  bookingController,
  authMiddleware,
} from "../config/dependencyInjection";
import { validate } from "../middlewares/validateMiddleware";
import {
  registerRules,
  loginRules,
  serviceRules,
  bookingRules,
} from "../validation/validationRules";
import { authLimiter } from "../middlewares/rateLimitMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

const router: Router = express.Router();

// Auth routes
router.post(
  "/auth/register",
  authLimiter,
  registerRules,
  validate,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    authController.register(req, res, next)),
);

router.post(
  "/auth/login",
  authLimiter,
  loginRules,
  validate,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    authController.login(req, res, next)),
);

router.post(
  "/auth/refresh",
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    authController.refresh(req, res, next)),
);

router.post("/auth/logout", asyncHandler((req: Request, res: Response) =>
  authController.logout(req, res)),
);

router.post(
  "/auth/forgot-password",
  asyncHandler((req: Request, res: Response) =>
    authController.forgotPassword(req, res)),
);

router.post(
  "/auth/reset-password/:token",
  asyncHandler((req: Request, res: Response) =>
    authController.resetPassword(req, res)),
);

// Service routes
router.get("/services", asyncHandler((req: Request, res: Response, next: NextFunction) =>
  serviceController.getAllServices(req, res, next)),
);

router.post(
  "/services",
  authMiddleware.protect,
  authMiddleware.admin,
  serviceRules,
  validate,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    serviceController.addService(req, res, next)),
);

router.put(
  "/services/:id",
  authMiddleware.protect,
  authMiddleware.admin,
  serviceRules,
  validate,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    serviceController.editService(req, res, next)),
);

router.delete(
  "/services/:id",
  authMiddleware.protect,
  authMiddleware.admin,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    serviceController.deleteService(req, res, next)),
);

// Booking routes
router.post(
  "/bookings",
  authMiddleware.protect,
  bookingRules,
  validate,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    bookingController.book(req, res, next)),
);

router.get(
  "/bookings/my",
  authMiddleware.protect,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    bookingController.getUserBookings(req, res, next)),
);

router.get(
  "/bookings/admin",
  authMiddleware.protect,
  authMiddleware.admin,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    bookingController.getAllBookings(req, res, next)),
);

export default router;
