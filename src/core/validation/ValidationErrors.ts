import {NextFunction, Request, Response} from 'express';
import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import {httpStatus} from "../core-types/http-statuses";

export type ValidationErrorExample = {
    field: string,
    message: string
}
export type ValidationErrorsStore = {
    errorsMessages: ValidationErrorExample[]
}

export const createErrorMessage = (errors: ValidationErrorExample[]):ValidationErrorsStore =>{
    return {errorsMessages:errors};
}

const formatErrors = (error: ValidationError) => {
    const myErrorView = error as unknown as FieldValidationError; // на вход получаю ошибку,
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

export const checkValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req)
        .formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
        //res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
        res.status(httpStatus.BadRequest).send(createErrorMessage(errors));
        return;
    }

    next();
};
