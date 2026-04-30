"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRules = exports.serviceRules = exports.loginRules = exports.registerRules = void 0;
const express_validator_1 = require("express-validator");
const ServiceCategories_1 = require("../../domain/constants/ServiceCategories");
exports.registerRules = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter'),
    (0, express_validator_1.body)('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
];
exports.loginRules = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
exports.serviceRules = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    (0, express_validator_1.body)('category')
        .isIn(ServiceCategories_1.SERVICE_CATEGORIES)
        .withMessage('Invalid category'),
    (0, express_validator_1.body)('pricePerDay')
        .isNumeric()
        .withMessage('Price must be a number')
        .custom((value) => value > 0)
        .withMessage('Price must be positive'),
    (0, express_validator_1.body)('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters'),
    (0, express_validator_1.body)('location').trim().notEmpty().withMessage('Location is required'),
    (0, express_validator_1.body)('contactDetails').trim().notEmpty().withMessage('Contact details are required'),
];
exports.bookingRules = [
    (0, express_validator_1.body)('serviceId').isMongoId().withMessage('Invalid service ID'),
    (0, express_validator_1.body)('startDate')
        .isISO8601()
        .withMessage('Invalid start date')
        .toDate(),
    (0, express_validator_1.body)('endDate')
        .isISO8601()
        .withMessage('Invalid end date')
        .toDate(),
];
//# sourceMappingURL=validationRules.js.map