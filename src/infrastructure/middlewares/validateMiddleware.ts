import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../../application/errors/AppErrors';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  const errorMessages = errors.array().map((err: any) => ({
    field: err.path,
    message: err.msg,
  }));

  // Throw a BadRequestError with the first error message
  // The errorMiddleware can be expanded later to handle structured validation errors if needed
  throw new BadRequestError(errorMessages[0].message);
};
