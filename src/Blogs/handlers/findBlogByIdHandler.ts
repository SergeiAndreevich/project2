import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export async function findBlogByIdHandler(req:Request,res:Response) {
    try {
        const video = await repository.findBlogById(req.params.id);
        if(!video){
            res.status(httpStatus.NotFound).send(
                createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
            );
            return
        }
        res.status(httpStatus.Ok).send(video)
    }
    catch(e){
        res.sendStatus(httpStatus.InternalServerError)
    }


}