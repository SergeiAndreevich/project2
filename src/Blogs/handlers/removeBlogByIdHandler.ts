import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export function removeBlogByIdHandler(req:Request,res:Response) {
    const id = parseInt(req.params.id);
    const blog = repository.findBlogById(id.toString());
    if(!blog){
        res.status(httpStatus.NotFound).send(
            createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
        );
        return
    }
    repository.removeBlogById(id.toString());
    res.sendStatus(httpStatus.NoContent)
}