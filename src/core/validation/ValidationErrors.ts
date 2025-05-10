import {NextFunction, Request, Response} from 'express';
import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import {httpStatus} from "../core-types/http-statuses";

const formatErrors = (error: ValidationError) => {
    const expressError = error as unknown as FieldValidationError;

    return {
        field: expressError.path,
        message: expressError.msg,
    };
};

export const checkValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
        res.status(httpStatus.BadRequest).json({ errorMessages: errors });
        return;
    }

    next();
};
