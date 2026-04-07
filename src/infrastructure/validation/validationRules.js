import { body } from 'express-validator';

export const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
];

export const loginRules = [
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

export const serviceRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('category').isIn(['venue', 'hotel', 'caterer', 'cameraman', 'DJ', 'other']).withMessage('Invalid category'),
  body('pricePerDay').isNumeric().withMessage('Price must be a number').custom(value => value > 0).withMessage('Price must be positive'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('contactDetails').trim().notEmpty().withMessage('Contact details are required')
];

export const bookingRules = [
  body('serviceId').isMongoId().withMessage('Invalid service ID'),
  body('startDate').isISO8601().withMessage('Invalid start date').toDate().custom(value => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (value < today) throw new Error('Start date cannot be in the past');
    return true;
  }),
  body('endDate').isISO8601().withMessage('Invalid end date').toDate().custom((value, { req }) => {
    if (value < new Date(req.body.startDate)) throw new Error('End date must be after start date');
    return true;
  })
];
