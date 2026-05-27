import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import { BadRequestError } from "../../application/errors/AppErrors";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  const errorMessages = errors.array().map((err: ValidationError) => {
    const error = err as unknown as {
      path?: string;
      param?: string;
      msg: string;
    };
    return {
      field: error.path || error.param || "unknown",
      message: error.msg,
    };
  });

  // Throw a BadRequestError with the first error message
  // The errorMiddleware can be expanded later to handle structured validation errors if needed
  throw new BadRequestError(errorMessages[0].message);
};
