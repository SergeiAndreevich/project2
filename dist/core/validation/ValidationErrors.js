"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const http_statuses_1 = require("../core-types/http-statuses");
const formatErrors = (error) => {
    const expressError = error;
    //error as unknown as FieldValidationError: Выполняет приведение типов (type casting). Этот шаг необходим, потому что TypeScript не позволяет напрямую приводить типы, которые не связаны друг с другом. В данном случае ValidationError и FieldValidationError могут не быть напрямую связаны в иерархии типов.
    //    error as unknown: Сначала приводится тип error к типу unknown. unknown - это специальный тип в TypeScript, который может представлять любое значение.
    //    as FieldValidationError: Затем тип unknown приводится к типу FieldValidationError. Тип FieldValidationError более специфичен, чем ValidationError, и представляет собой ошибку валидации, связанную с конкретным полем. Он, вероятно, содержит свойства, специфичные для ошибок, связанных с полями (например, имя поля).
    return {
        field: expressError.path,
        message: expressError.msg,
    };
};
const checkValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).array();
    // .formatWith(formatErrors).array({ onlyFirstError: true });
    if (errors.length > 0) {
        res.status(http_statuses_1.httpStatus.BadRequest).json({ errorMessages: errors });
        return;
    }
    next();
};
exports.checkValidationErrors = checkValidationErrors;
