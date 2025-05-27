import { Request, Response } from 'express';
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";
import {blogsService} from "../BLL/blogs.bll.service";
import {WithId} from "mongodb";
import {Blog} from "../Blog";

export async function findBlogByIdHandler(req:Request,res:Response) {
    try {
        const blog:WithId<Blog> = await blogsService.findBlogById(req.params.id);
        if(!blog){
            res.status(httpStatus.NotFound).send(
                createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
            );
            return
        }
        const blogToView = mapBlogToViewModel(blog);
        res.status(httpStatus.Ok).send(blogToView)
    }
    catch(e){
        res.sendStatus(httpStatus.InternalServerError)
    }


}