import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {PostInputModel} from "../dto/post-input-model";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export async function updatePostByIdHandler(req:Request<{id:string},{},PostInputModel>,res:Response) {
    try{
        const id = req.params.id;
        const post = await repository.findPostById(id);
        if(!post){
            res.status(httpStatus.NotFound).send(
                createErrorMessage([{ field: 'id', message: 'Post not found' }]),
            );
            return
        }
        await repository.updatePost(id,req.body);
        res.sendStatus(httpStatus.NoContent)
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }

}