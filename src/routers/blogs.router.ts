import { Router } from 'express';
import {createBlogHandler} from "../Blogs/handlers/createBlog.handler";
import {findAllBlogsHandler} from "../Blogs/handlers/findAllBlogsHandler";
import {findBlogByIdHandler} from "../Blogs/handlers/findBlogByIdHandler";
import {removeBlogByIdHandler} from "../Blogs/handlers/removeBlogByIdHandler";
import {updateBlogByIdHandler} from "../Blogs/handlers/updateBlogByIdHandler";
import {idValidation} from "../core/validation/checkId.validation";
import {blogInputModelValidation} from "../core/validation/InputBlog.validation";
import {checkValidationErrors} from "../core/validation/ValidationErrors";

export const blogsRouter = Router({});

blogsRouter
    .get('', findAllBlogsHandler)
    .get('/:id',idValidation, checkValidationErrors,findBlogByIdHandler)
    .post('', blogInputModelValidation, checkValidationErrors, createBlogHandler)
    .put('/:id', idValidation, blogInputModelValidation, checkValidationErrors, updateBlogByIdHandler)
    .delete('/:id',idValidation,checkValidationErrors,removeBlogByIdHandler)