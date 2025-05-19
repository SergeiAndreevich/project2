import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";

export async function findBlogByIdHandler(req:Request,res:Response) {
    try {
        const blog = await repository.findBlogById(req.params.id);
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