import {param} from "express-validator";

export const idValidation = param('id')
    .exists()
    .withMessage('Id is required')
    .isString()
    .withMessage('Id must be string')
    .isLength({min: 1})
    .withMessage('Id must consist of length more than or equal to 1')
    .isNumeric()
    .withMessage('It must be a numeric string')