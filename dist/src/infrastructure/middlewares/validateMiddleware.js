"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const AppErrors_1 = require("../../application/errors/AppErrors");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
        return;
    }
    const errorMessages = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
    }));
    // Throw a BadRequestError with the first error message
    // The errorMiddleware can be expanded later to handle structured validation errors if needed
    throw new AppErrors_1.BadRequestError(errorMessages[0].message);
};
exports.validate = validate;
//# sourceMappingURL=validateMiddleware.js.map