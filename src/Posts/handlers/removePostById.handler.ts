import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export function removePostByIdHandler(req:Request,res:Response) {
    const post = repository.findPostById(req.params.id);
    if(!post){
        res.status(httpStatus.NotFound).send(
            createErrorMessage([{ field: 'id', message: 'Post not found' }]),
        );
        return
    }
    repository.removePostById(req.params.id);
    res.sendStatus(httpStatus.NoContent)
}