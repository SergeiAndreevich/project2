import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {localDB} from "../../db/mock-db.db";
import {BlogInputModel} from "../dto/blog-input-model";

export function updateBlogByIdHandler(req:Request<{id:string},{},BlogInputModel>,res:Response) {
    const blog = repository.findBlogById(req.params.id);
    if(!blog){
        throw new Error('Blog does not exist');
    }
    repository.updateBlog(blog,req.body);
    res.status(httpStatus.NoContent).send("Updated")
}