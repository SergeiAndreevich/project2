"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const createPost_handler_1 = require("../Posts/handlers/createPost.handler");
const findAllPosts_handler_1 = require("../Posts/handlers/findAllPosts.handler");
const findPostById_handler_1 = require("../Posts/handlers/findPostById.handler");
const updatePostById_handler_1 = require("../Posts/handlers/updatePostById.handler");
const removePostById_handler_1 = require("../Posts/handlers/removePostById.handler");
const checkId_validation_1 = require("../core/validation/checkId.validation");
const InputPost_validation_1 = require("../core/validation/InputPost.validation");
const ValidationErrors_1 = require("../core/validation/ValidationErrors");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter
    .get('', findAllPosts_handler_1.findAllPostsHandler)
    .post('', InputPost_validation_1.postInputModelValidation, ValidationErrors_1.checkValidationErrors, createPost_handler_1.createPostHandler)
    .get('/:id', checkId_validation_1.idValidation, ValidationErrors_1.checkValidationErrors, findPostById_handler_1.findPostByIdHandler)
    .put('/:id', checkId_validation_1.idValidation, InputPost_validation_1.postInputModelValidation, ValidationErrors_1.checkValidationErrors, updatePostById_handler_1.updatePostByIdHandler)
    .delete('/:id', checkId_validation_1.idValidation, ValidationErrors_1.checkValidationErrors, removePostById_handler_1.removePostByIdHandler);
