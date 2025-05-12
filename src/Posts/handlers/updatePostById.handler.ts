import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {PostInputModel} from "../dto/post-input-model";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export function updatePostByIdHandler(req:Request<{id:string},{},PostInputModel>,res:Response) {
    const post = repository.findPostById(req.params.id);

    if(!post){
        res.status(httpStatus.NotFound).send(
            createErrorMessage([{ field: 'id', message: 'Post not found' }]),
        );
        return
    }
    repository.updatePost(post,req.body);
    res.sendStatus(httpStatus.NoContent)
}