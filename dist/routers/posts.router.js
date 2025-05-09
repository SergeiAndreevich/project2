"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const createPost_handler_1 = require("../Posts/handlers/createPost.handler");
const findAllPosts_handler_1 = require("../Posts/handlers/findAllPosts.handler");
const findPostById_handler_1 = require("../Posts/handlers/findPostById.handler");
const updatePostById_handler_1 = require("../Posts/handlers/updatePostById.handler");
const removePostById_handler_1 = require("../Posts/handlers/removePostById.handler");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter
    .get('', findAllPosts_handler_1.findAllPostsHandler)
    .post('', createPost_handler_1.createPostHandler)
    .get('/:id', findPostById_handler_1.findPostByIdHandler)
    .put('/:id', updatePostById_handler_1.updatePostByIdHandler)
    .delete('/:id', removePostById_handler_1.removePostByIdHandler);
