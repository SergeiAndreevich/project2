import {Request,Response} from "express";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export function findPostByIdHandler(req:Request,res:Response){
    const post = repository.findPostById(req.params.id);
    if(!post){
        throw new Error("Post not found");
    }
    res.status(httpStatus.Ok).send(post)
}