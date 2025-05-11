"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const createBlog_handler_1 = require("../Blogs/handlers/createBlog.handler");
const findAllBlogsHandler_1 = require("../Blogs/handlers/findAllBlogsHandler");
const findBlogByIdHandler_1 = require("../Blogs/handlers/findBlogByIdHandler");
const removeBlogByIdHandler_1 = require("../Blogs/handlers/removeBlogByIdHandler");
const updateBlogByIdHandler_1 = require("../Blogs/handlers/updateBlogByIdHandler");
const checkId_validation_1 = require("../core/validation/checkId.validation");
const InputBlog_validation_1 = require("../core/validation/InputBlog.validation");
const ValidationErrors_1 = require("../core/validation/ValidationErrors");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter
    .get('', ValidationErrors_1.checkValidationErrors, findAllBlogsHandler_1.findAllBlogsHandler)
    .get('/:id', checkId_validation_1.idValidation, ValidationErrors_1.checkValidationErrors, findBlogByIdHandler_1.findBlogByIdHandler)
    .post('', InputBlog_validation_1.blogInputModelValidation, ValidationErrors_1.checkValidationErrors, createBlog_handler_1.createBlogHandler)
    .put('/:id', checkId_validation_1.idValidation, InputBlog_validation_1.blogInputModelValidation, ValidationErrors_1.checkValidationErrors, updateBlogByIdHandler_1.updateBlogByIdHandler)
    .delete('/:id', checkId_validation_1.idValidation, ValidationErrors_1.checkValidationErrors, removeBlogByIdHandler_1.removeBlogByIdHandler);
