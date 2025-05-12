import { Router } from 'express';
import {createBlogHandler} from "../Blogs/handlers/createBlog.handler";
import {findAllBlogsHandler} from "../Blogs/handlers/findAllBlogsHandler";
import {findBlogByIdHandler} from "../Blogs/handlers/findBlogByIdHandler";
import {removeBlogByIdHandler} from "../Blogs/handlers/removeBlogByIdHandler";
import {updateBlogByIdHandler} from "../Blogs/handlers/updateBlogByIdHandler";
import {idValidation} from "../core/validation/checkId.validation";
import {blogInputModelValidation} from "../core/validation/InputBlog.validation";
import {checkValidationErrors} from "../core/validation/ValidationErrors";
import {authorizeMiddleware} from "../authorization/authorization.middleware";

export const blogsRouter = Router({});

blogsRouter
    .get('', checkValidationErrors, findAllBlogsHandler)
    .get('/:id',idValidation, checkValidationErrors, findBlogByIdHandler)
    .post('', authorizeMiddleware, blogInputModelValidation, checkValidationErrors, createBlogHandler)
    .put('/:id', authorizeMiddleware, idValidation,blogInputModelValidation, checkValidationErrors, updateBlogByIdHandler)
    .delete('/:id', authorizeMiddleware, idValidation, checkValidationErrors, removeBlogByIdHandler)