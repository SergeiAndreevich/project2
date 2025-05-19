"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidationErrors = exports.createErrorMessage = void 0;
const express_validator_1 = require("express-validator");
const http_statuses_1 = require("../core-types/http-statuses");
const createErrorMessage = (errors) => {
    return { errorsMessages: errors };
};
exports.createErrorMessage = createErrorMessage;
const formatErrors = (error) => {
    const myErrorView = error; // на вход получаю ошибку,
    // так как это валидация, то от объекта ValidationError мне нужен лишь подобъект FieldValidationError
    // у него есть свойства type, location, path, value?, msg
    //error as unknown as FieldValidationError: Выполняет приведение типов (type casting). Этот шаг необходим, потому что TypeScript не позволяет напрямую приводить типы, которые не связаны друг с другом. В данном случае ValidationError и FieldValidationError могут не быть напрямую связаны в иерархии типов.
    //    error as unknown: Сначала приводится тип error к типу unknown. unknown - это специальный тип в TypeScript, который может представлять любое значение.
    //    as FieldValidationError: Затем тип unknown приводится к типу FieldValidationError. Тип FieldValidationError более специфичен, чем ValidationError, и представляет собой ошибку валидации, связанную с конкретным полем. Он, вероятно, содержит свойства, специфичные для ошибок, связанных с полями (например, имя поля).
    return {
        field: myErrorView.path,
        message: myErrorView.msg,
    };
};
const checkValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req)
        .formatWith(formatErrors).array({ onlyFirstError: true });
    if (errors.length > 0) {
        //res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
        res.status(http_statuses_1.httpStatus.BadRequest).send((0, exports.createErrorMessage)(errors));
        return;
    }
    next();
};
exports.checkValidationErrors = checkValidationErrors;
