import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {PostInputModel} from "../dto/post-input-model";

export function updatePostByIdHandler(req:Request<{id:string},{},PostInputModel>,res:Response) {
    const post = repository.findPostById(req.params.id);
    if(!post){
        throw new Error('Blog does not exist');
    }
    repository.updatePost(post,req.body);
    res.status(httpStatus.NoContent).send("Updated")
}