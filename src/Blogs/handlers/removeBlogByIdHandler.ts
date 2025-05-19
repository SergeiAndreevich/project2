import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export async function removeBlogByIdHandler(req:Request,res:Response) {
    try {
        const id = req.params.id;
        const blog = await repository.findBlogById(id);
        if(!blog){
            res.status(httpStatus.NotFound).send(
                createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
            );
            return
        }
        await repository.removeBlogById(id);
        res.sendStatus(httpStatus.NoContent)
    }
    catch (e) {
        res.sendStatus(httpStatus.InternalServerError)
    }
}