import {Request,Response} from "express";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";

export async function findPostByIdHandler(req:Request,res:Response){
    try{
        const post = await repository.findPostById(req.params.id);
        if(!post){
            res.status(httpStatus.NotFound).send(
                createErrorMessage([{ field: 'id', message: 'Post not found' }]),
            );
            return
        }
        const postToView = mapPostToViewModel(post);
        res.status(httpStatus.Ok).send(postToView)
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }
}