"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const createBlog_handler_1 = require("../Blogs/handlers/createBlog.handler");
const findAllBlogsHandler_1 = require("../Blogs/handlers/findAllBlogsHandler");
const findBlogByIdHandler_1 = require("../Blogs/handlers/findBlogByIdHandler");
const removeBlogByIdHandler_1 = require("../Blogs/handlers/removeBlogByIdHandler");
const updateBlogByIdHandler_1 = require("../Blogs/handlers/updateBlogByIdHandler");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter
    .get('', findAllBlogsHandler_1.findAllBlogsHandler)
    .get('/:id', findBlogByIdHandler_1.findBlogByIdHandler)
    .post('', createBlog_handler_1.createBlogHandler)
    .put('/:id', updateBlogByIdHandler_1.updateBlogByIdHandler)
    .delete('/:id', removeBlogByIdHandler_1.removeBlogByIdHandler);
