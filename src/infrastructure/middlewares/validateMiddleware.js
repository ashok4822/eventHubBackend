import { validationResult } from 'express-validator';
import { STATUS_CODES } from '../../interfaces/constants/statusCodes.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map(err => ({
    field: err.path,
    message: err.msg
  }));

  return res.status(STATUS_CODES.BAD_REQUEST).json({
    errors: errorMessages,
    error: errorMessages[0].message
  });
};
