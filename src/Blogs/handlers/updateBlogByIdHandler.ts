import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {localDB} from "../../db/mock-db.db";
import {BlogInputModel} from "../dto/blog-input-model";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export function updateBlogByIdHandler(req:Request<{id:string},{},BlogInputModel>,res:Response) {
    const blog = repository.findBlogById(req.params.id);
    if(!blog){
        res.status(httpStatus.NotFound).send(
            createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
        );
        return
    }
    repository.updateBlog(blog,req.body);
    res.sendStatus(httpStatus.NoContent)
}