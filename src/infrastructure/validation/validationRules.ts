import { body, ValidationChain } from 'express-validator';
import { SERVICE_CATEGORIES } from '../../domain/constants/ServiceCategories';

export const registerRules: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
];

export const loginRules: ValidationChain[] = [
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export const serviceRules: ValidationChain[] = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),
  body('category')
    .isIn(SERVICE_CATEGORIES as unknown as string[])
    .withMessage('Invalid category'),
  body('pricePerDay')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value: number) => value > 0)
    .withMessage('Price must be positive'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('contactDetails').trim().notEmpty().withMessage('Contact details are required'),
];

export const bookingRules: ValidationChain[] = [
  body('serviceId').isMongoId().withMessage('Invalid service ID'),
  body('startDate')
    .isISO8601()
    .withMessage('Invalid start date')
    .toDate(),
  body('endDate')
    .isISO8601()
    .withMessage('Invalid end date')
    .toDate(),
];
