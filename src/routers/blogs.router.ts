import { Router } from 'express';
import {createBlogHandler} from "../Blogs/handlers/createBlog.handler";
import {findAllBlogsHandler} from "../Blogs/handlers/findAllBlogsHandler";
import {findBlogByIdHandler} from "../Blogs/handlers/findBlogByIdHandler";
import {removeBlogByIdHandler} from "../Blogs/handlers/removeBlogByIdHandler";
import {updateBlogByIdHandler} from "../Blogs/handlers/updateBlogByIdHandler";

export const blogsRouter = Router({});

blogsRouter
    .get('', findAllBlogsHandler)
    .get('/:id',findBlogByIdHandler)
    .post('', createBlogHandler)
    .put('/:id',updateBlogByIdHandler)
    .delete('/:id',removeBlogByIdHandler)