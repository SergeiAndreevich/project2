import {Request,Response} from "express";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";

export async function findPostByIdHandler(req:Request,res:Response){
    try{
        const post = await repository.findPostById(req.params.id);
        if(!post){
            res.status(httpStatus.NotFound).send(
                createErrorMessage([{ field: 'id', message: 'Post not found' }]),
            );
            return
        }
        res.status(httpStatus.Ok).send(post)
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }
}