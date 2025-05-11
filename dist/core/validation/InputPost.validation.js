"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputModelValidation = void 0;
const express_validator_1 = require("express-validator");
const titleValidation = (0, express_validator_1.body)("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Title length must be >1 and <30");
const shortDescriptionValidation = (0, express_validator_1.body)("shortDescription")
    .exists()
    .withMessage("ShortDescription is required")
    .isString()
    .withMessage("ShortDescription must be a string")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("ShortDescription must be >1 and <100");
const contentValidation = (0, express_validator_1.body)("content")
    .exists()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content must be >1 and <1000");
const blogIdValidation = (0, express_validator_1.body)("blogId")
    .exists()
    .withMessage('blogId is required')
    .isString() // Проверяем, что это строка
    .withMessage("BlogId must be a string")
    .isNumeric() // Проверяем, что это numericString
    .withMessage("BlogId must be a numeric string")
    .trim()
    .isLength({ min: 1 })
    .withMessage('blogId must consist of length more than or equal to 1');
exports.postInputModelValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
];
